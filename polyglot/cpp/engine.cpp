// C++ math engine, compiled to freestanding WebAssembly.
extern "C" {
__attribute__((export_name("mandel"))) int mandel(double cx,double cy,int maxIter){ double x=0,y=0; int i=0; while(i<maxIter && x*x+y*y<=4.0){ double xt=x*x-y*y+cx; y=2*x*y+cy; x=xt; ++i; } return i; }
__attribute__((export_name("dist3"))) double dist3(double x1,double y1,double z1,double x2,double y2,double z2){ double dx=x1-x2,dy=y1-y2,dz=z1-z2; return __builtin_sqrt(dx*dx+dy*dy+dz*dz); }
}
