let conv_img;
let kernel;
let imgArray;

function preload() {
  conv_img = loadImage('./img.jpg');
}

function setup() {
  let canvas = createCanvas(conv_img.width, conv_img.height);

  pixelDensity(1);

  conv_img.loadPixels();

  imgArray = Array.prototype.slice.call(conv_img.pixels);

}

function draw() {
  //image(conv_img,0,0);
  kernel = tf.randomUniform([
    1, 1, 4, 4
  ], 0.0, 0.01);

  let tf_img = tf.tensor3d(imgArray, [426, 640, 4]);

  let tf_conv = tf.conv2d(tf_img, kernel, 20, 'valid');

  tf_conv = tf_conv.sigmoid()

  tf.toPixels(tf_conv, canvas);

}
