//go:build js && wasm

// Portal Physics engine — written in Go, compiled to WebAssembly, runs in the browser.
package main

import (
	"math"
	"syscall/js"
)

const (
	c = 299792458.0   // speed of light, m/s
	G = 6.674e-11      // gravitational constant
)

func main() {
	js.Global().Set("goPhysics", js.ValueOf(map[string]interface{}{}))
	gp := js.Global().Get("goPhysics")
	set := func(name string, fn func(a []js.Value) interface{}) {
		gp.Set(name, js.FuncOf(func(this js.Value, a []js.Value) interface{} { return fn(a) }))
	}
	// Schwarzschild radius (event horizon) for a given mass in kg -> meters
	set("schwarzschild", func(a []js.Value) interface{} { return 2 * G * a[0].Float() / (c * c) })
	// Lorentz factor (time dilation) for velocity in m/s
	set("lorentz", func(a []js.Value) interface{} {
		v := a[0].Float()
		if v >= c { return math.Inf(1) }
		return 1 / math.Sqrt(1-(v*v)/(c*c))
	})
	// Escape velocity (m/s) for mass kg + radius m
	set("escapeVel", func(a []js.Value) interface{} { return math.Sqrt(2 * G * a[0].Float() / a[1].Float()) })
	// Circular orbital velocity (m/s)
	set("orbitalVel", func(a []js.Value) interface{} { return math.Sqrt(G * a[0].Float() / a[1].Float()) })
	// Negative energy density needed to hold a wormhole throat of radius r (rough Morris-Thorne estimate, J/m^3)
	set("exoticEnergy", func(a []js.Value) interface{} { r := a[0].Float(); return -(c * c * c * c) / (8 * math.Pi * G * r * r) })
	set("lang", func(a []js.Value) interface{} { return "Go " + goVersion() + " → WebAssembly" })
	js.Global().Set("goPhysicsReady", true)
	select {}
}
func goVersion() string { return "1.26" }
