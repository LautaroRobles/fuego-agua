#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D iChannel0;    // Bricks texture

uniform float time;
uniform vec2 resolution;

varying vec2 fragCoord;

void main( void ) {
    vec2 texcoord = (fragCoord.xy / resolution.xy);
    vec4 bricks = texture2D(iChannel0, texcoord);

    gl_FragColor = bricks;
}