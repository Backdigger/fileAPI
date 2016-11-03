
    if (window.File && window.FileReader && window.FileList) {
        function handleFileSelect(evt) {
            var files = evt.target.files; // FileList object
            var f = files[0];

            // Read in the image file as a data URL.

            var reader = new FileReader();
            reader.onload = function (event) {
                var dataUri = event.target.result,
                    context = document.getElementById("output").getContext("2d"),
                    img = new Image();
                img.onload = function () {
                    context.drawImage(img, 0, 0, 300, 150);
                    var imageData = context.getImageData(0, 0, 300, 150);
                    var imageDataFiltered = colorGray(imageData);
                    context.putImageData(imageDataFiltered, 0, 0);
                };
                img.src = dataUri;
            };

            var colorGray = (function (imageData) {

                    var pixels = imageData.data;
                    var r, g, b, f , p, q , t, lH;
                for (var i = 0; i < pixels.length; i += 4) {
                    r = pixels[i];
                    g = pixels[i + 1];
                    b = pixels[i + 2];
                    //var v = 0.21 * r + 0.72 * g + 0.07 * b;
                    pixels[i] = pixels[i + 1] = pixels[i + 2];

                }
                r /= 255, g /= 255, b /= 255;
                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                // Applying gray filter to image
                var h, s, l = (max + min) / 2;

                if(max == min) {
                    h = s = 0; // achromatic
                } else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch(max){
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }

                    s = (s > 1 )? s/100 : s;
                    l = (l > 1)? l/100 : l;
                    lH = parseInt (h / 60);
                    f = h/60 - lH;
                    p = l * (1 - s);
                    q = l *(1 - s*f);
                    t = (1 - (1-f)* s);
                    switch (lH)
                    {
                        case 0: r = l; g = t; b = p; break;
                        case 1: r = q; g = l; b = p; break;
                        case 2: r = p; g = l; B = t; break;
                        case 3: r = p; g = q; B = l; break;
                        case 4: r = t; g = p; B = l; break;
                        case 5: r = l; g = p; B = q; break;
                    }
                parseInt(r*255), parseInt(g*255), parseInt(b*255);

                return imageData;
            });

            reader.readAsDataURL(f);

             }




            function showFileInput() {
                var inputButton = document.getElementById("files");
                inputButton.click();
            }

            // Binding custom button to input type file
            document.getElementById('getImg').addEventListener('click', showFileInput, false);
            document.getElementById('files').addEventListener('change', handleFileSelect, false);




    } else {
        alert('The File APIs are not fully supported in this browser.');
    }



