// Pure C math engine, compiled to freestanding WebAssembly.
__attribute__((export_name("fib"))) long fib(int n){ long a=0,b=1; while(n-->0){ long t=a+b; a=b; b=t; } return a; }
__attribute__((export_name("isPrime"))) int isPrime(long n){ if(n<2) return 0; if(n%2==0) return n==2; for(long i=3;i*i<=n;i+=2) if(n%i==0) return 0; return 1; }
__attribute__((export_name("gcd"))) long gcd(long a,long b){ while(b){ long t=a%b; a=b; b=t; } return a<0?-a:a; }
