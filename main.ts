import{readFileSync as f,readdirSync as d,mkdirSync as m,writeFileSync as w}from'node:fs';
const A=process.env.MAKEFUN_INPUT_DIR||'/input',B=process.env.MAKEFUN_OUTPUT_DIR||'/output',T=`!2b%'+,0QQQQQQQQ*******&***&***Q***QQQQQQQQQQQQQAEEA!QQQQQQQQQQQ&)QQQQQQQQQQQQQQ%%"%`;
function V(P,Q){
 const S=[],K=[],M=[],U=new Uint8Array(1<<16),L=P.length;
 let s=0,j=0,pc=0,n=0,o=0,q=0;
 const E=x=>[U.subarray(0,o),x];
 for(;;){
  if(n==1e6)return E(10);
  if(pc>>>0>=L)return E(9);
  let op=P[pc],t=T.charCodeAt(op)-33,im=t>>4,pp=t>>2&3,pu=t&3;
  if(op>83|im==3)return E(5);
  if(pc+im>=L)return E(9);
  n++;
  let nx=pc+1+im;
  if(s<pp)return E(2);
  if(s-pp+pu>256)return E(3);
  pc=nx;
  let x,y,z=(P[nx-2]|P[nx-1]<<8)<<16>>16,u,v;
  if(!op)return E(0);
  else if(op<2)S[s++]=P[pc-1]<<24>>24;
  else if(op<3)S[s++]=P[pc-4]|P[pc-3]<<8|P[pc-2]<<16|P[pc-1]<<24;
  else if(op<4)s--;
  else if(op<5)S[s]=S[s-1],s++;
  else if(op<6)[S[s-1],S[s-2]]=[S[s-2],S[s-1]];
  else if(op<7)S[s]=S[s-2],s++;
  else if(op<8)[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];
  else if(op==23)S[s-1]=-S[s-1]|0;
  else if(op==27)S[s-1]=~S[s-1];
  else if(op<35){
   y=S[s-1],x=S[s-2],u=x>>>0,v=y>>>0;
   if(op>18&op<23&!y)return E(4);
   s-=2;
   S[s++]=[x+y,x-y,Math.imul(x,y),x/y,x%y,u/v,u%v,,x&y,x|y,x^y,,x<<y,x>>y,x>>>y,,x==y,x<y,u<v][op-16]|0;
  }
  else if(op<49)pc=nx+z;
  else if(op<51)y=S[--s],(op<50)==!y&&(pc=nx+z);
  else if(op<52){if(j==64)return E(7);K[j++]=nx,pc=z>>>0}
  else if(op<53){if(!j)return E(8);pc=K[--j]}
  else if(op<65){x=S[s-1];if(x>>>0>255)return E(6);S[s-1]=M[x]|0}
  else if(op<66){x=S[s-1];if(x>>>0>255)return E(6);M[x]=S[s-2],s-=2}
  else if(op<81){if(o+(z=''+S[s-1]).length>65536)return E(11);U.set(Buffer.from(z),o),o+=z.length,s--}
  else if(op<82){if(o>65535)return E(11);U[o++]=S[--s]&255}
  else if(op<83)S[s++]=Q[q++]??-1;
  else return E(S[--s]&255);
 }
}
d(A).map(g=>{
 let p=A+'/'+g,q=B+'/'+g,[u,e]=V(f(p+'/program.bin'),f(p+'/input.bin'));
 m(q,{recursive:!0});
 w(q+'/stdout.bin',u);
 w(q+'/exit.txt',e+'\n');
});
