function doTween(gameObject, scale) {
  gameObject.tween = gameObject.game.add.tween(gameObject.scale).to({
    x: scale,
    y: scale
  }, 1000, Phaser.Easing.Elastic.Out, true);
}
