/*
Copyright (c) ViliusL
https://github.com/viliusle

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//name: Hermite resize
//about: Fast image resize/resample using Hermite filter with JavaScript.
//author: ViliusL
//demo: http://viliusle.github.io/miniPaint/
function resample_hermite(canvas, W, H, W2, H2) {
	var time1 = Date.now();
	W2 = Math.round(W2);
	H2 = Math.round(H2);
	var img = canvas.getContext("2d").getImageData(0, 0, W, H);
	var img2 = canvas.getContext("2d").getImageData(0, 0, W2, H2);
	var data = img.data;
	var data2 = img2.data;
	var ratio_w = W / W2;
	var ratio_h = H / H2;
	var ratio_w_half = Math.ceil(ratio_w / 2);
	var ratio_h_half = Math.ceil(ratio_h / 2);

	for (var j = 0; j < H2; j++) {
		for (var i = 0; i < W2; i++) {
			var x2 = (i + j * W2) * 4;
			var weight = 0;
			var weights = 0;
			var weights_alpha = 0;
			var gx_r = (gx_g = gx_b = gx_a = 0);
			var center_y = (j + 0.5) * ratio_h;
			for (
				var yy = Math.floor(j * ratio_h);
				yy < (j + 1) * ratio_h;
				yy++
			) {
				var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
				var center_x = (i + 0.5) * ratio_w;
				var w0 = dy * dy; //pre-calc part of w
				for (
					var xx = Math.floor(i * ratio_w);
					xx < (i + 1) * ratio_w;
					xx++
				) {
					var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
					var w = Math.sqrt(w0 + dx * dx);
					if (w >= -1 && w <= 1) {
						//hermite filter
						weight = 2 * w * w * w - 3 * w * w + 1;
						if (weight > 0) {
							dx = 4 * (xx + yy * W);
							//alpha
							gx_a += weight * data[dx + 3];
							weights_alpha += weight;
							//colors
							if (data[dx + 3] < 255)
								weight = (weight * data[dx + 3]) / 250;
							gx_r += weight * data[dx];
							gx_g += weight * data[dx + 1];
							gx_b += weight * data[dx + 2];
							weights += weight;
						}
					}
				}
			}
			data2[x2] = gx_r / weights;
			data2[x2 + 1] = gx_g / weights;
			data2[x2 + 2] = gx_b / weights;
			data2[x2 + 3] = gx_a / weights_alpha;
		}
	}
	console.log("hermite = " + Math.round(Date.now() - time1) / 1000 + " s");
	canvas.getContext("2d").clearRect(0, 0, Math.max(W, W2), Math.max(H, H2));
	canvas.width = W2;
	canvas.height = H2;
	canvas.getContext("2d").putImageData(img2, 0, 0);
}
