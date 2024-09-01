#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

void main( void ) {
	vec3 color = vec3(0);
	vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
	vec2 c = floor(gl_FragCoord.xy);
	float m = mod(c.x + c.y, 3.0);
	float t = time + radians(m * 120.0);
	if (distance(uv, vec2(0.33, 0) * rot(t)) < 0.5) {
		if (m == 0.0) color = vec3(1, 0, 0);
		if (m == 1.0) color = vec3(0, 1, 0);
		if (m == 2.0) color = vec3(0, 0, 1);
	}
	gl_FragColor = vec4(color, 1);
}
