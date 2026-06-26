// Rust math engine, compiled to freestanding WebAssembly.
#![no_std]
#[panic_handler] fn ph(_: &core::panic::PanicInfo) -> ! { loop {} }

#[no_mangle] pub extern "C" fn collatz(start: u32) -> u32 {
    let mut n = start as u64; let mut steps = 0u32;
    while n > 1 { if n & 1 == 0 { n >>= 1 } else { n = 3 * n + 1 } steps += 1; }
    steps
}
#[no_mangle] pub extern "C" fn nth_prime(k: u32) -> u32 {
    let mut count = 0u32; let mut n = 1u32;
    while count < k { n += 1; let mut p = true; let mut i = 2u32;
        while i * i <= n { if n % i == 0 { p = false; break } i += 1; }
        if p { count += 1; } }
    n
}
