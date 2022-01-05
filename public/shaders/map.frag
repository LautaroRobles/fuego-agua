#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D iChannel0;    // Background texture
uniform sampler2D iChannel1;    // Map texture

uniform float time;
uniform vec2 resolution;

varying vec2 fragCoord;

vec4 tiles() {
    float tiling = 16.0;

    vec2 tilesTexcoord = (fragCoord.xy / resolution.y) * tiling;
    vec4 tiles = texture2D(iChannel0, tilesTexcoord);

    vec2 mapTexcoord = (fragCoord.xy / resolution.xy);
    vec4 map = texture2D(iChannel1, mapTexcoord);

    /*
    if(map.w != texture2D(iChannel1, mapTexcoord + vec2(0.01, 0.01)).w)
        tiles = vec4(1,0,0,1);
    */

    return mix(vec4(0,0,0,0), tiles, map.w);
}

float border() {
    float borderRadius = 0.001;

    float border = 0.0;

    for(int x = 0; x < 3; x++) {
        for(int y = 0; y < 3; y++) {
            vec2 mapTexcoord = (fragCoord.xy / resolution.xy);
            vec4 map = texture2D(iChannel1, mapTexcoord + vec2(1 - x, 1 - y) * borderRadius);
            border += map.w;
        }
    }

    return border == 9.0 || border <= 1.0 ? 0.0 : 1.0;
}

void main( void ) {
    vec4 borderColor = vec4(0,0,0,1);

    vec4 tiles = tiles();
    float border = border();

    vec4 finalColor = mix(tiles, borderColor, border);

    gl_FragColor = finalColor;
}