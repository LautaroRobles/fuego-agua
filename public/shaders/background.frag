#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D iChannel0;    // Background texture

uniform float time;
uniform vec2 resolution;

varying vec2 fragCoord;

void main( void ) {
    vec2 fragCoordFix = vec2(fragCoord.x, 1.0 - fragCoord.y);

    float tiling = 16.0;

    vec2 backgroundTexcoord = (fragCoordFix.xy / resolution.y) * tiling;
    vec4 background = texture2D(iChannel0, backgroundTexcoord);

    background *= 0.5;
    background.w = 1.0;

    gl_FragColor = background;
}