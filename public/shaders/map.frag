#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D iChannel0;    // Background texture
uniform sampler2D iChannel1;    // Map texture

uniform float time;
uniform vec2 resolution;

varying vec2 fragCoord;

void main( void ) {
    vec2 fragCoordFix = vec2(fragCoord.x, fragCoord.y);

    float tiling = 16.0;

    vec2 backgroundTexcoord = (fragCoordFix.xy / resolution.y) * tiling;
    vec4 background = texture2D(iChannel0, backgroundTexcoord);

    vec2 mapTexcoord = (fragCoordFix.xy / resolution.xy);
    vec4 map = texture2D(iChannel1, mapTexcoord);

    vec4 finalColor = mix(vec4(0,0,0,0), background, map.w);

    gl_FragColor = finalColor;
}