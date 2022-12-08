---
uniform.tiling: { "type": "1f", "value": 1.0 }
uniform.darken: { "type": "1f", "value": 1.0 }
---

#ifdef GL_ES
precision mediump float;
#endif

uniform float tiling;
uniform float darken;
uniform sampler2D iChannel0;    // Background texture

uniform float time;
uniform vec2 resolution;

varying vec2 fragCoord;

void main( void ) {
    vec2 offset = vec2(0.25, 0);
    vec2 fragCoordFlipVertical = vec2(fragCoord.x, 1.0 - fragCoord.y);

    vec2 backgroundTexcoord = (fragCoordFlipVertical.xy / resolution.y + offset) * tiling;
    vec4 background = texture2D(iChannel0, backgroundTexcoord);

    background *= darken;
    background.w = 1.0;

    gl_FragColor = background;
}