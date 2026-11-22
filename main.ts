import{readFileSync as f,readdirSync as d,mkdirSync as m,writeFileSync as w}from'node:fs';
const A=process.env.MAKEFUN_INPUT_DIR||'/input',B=process.env.MAKEFUN_OUTPUT_DIR||'/output',T=`!2b%'+,0!!!!!!!!*******&***&***!***!!!!!!!!!!!!!AEEA!!!!!!!!!!!!&)!!!!!!!!!!!!!!%%"%`;
function V(P,Q){
 const S=new Int32Array(256),K=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536);
 let s=0,j=0,pc=0,n=0,o=0,q=0;
 const E=x=>[U.subarray(0,o),x];
 for(;;){
  if(n==1e6)return E(10);
  if(pc<0||pc>=P.length)return E(9);
  let op=P[pc];
  if(!(0xf0003001f00077fff00ffn>>BigInt(op)&1n))return E(5);
  let t=T.charCodeAt(op)-33,im=t>>4,pp=t>>2&3,pu=t&3;
  if(pc+im>=P.length)return E(9);
  n++;
  let nx=pc+1+im;
  if(s<pp)return E(2);
  if(s-pp+pu>256)return E(3);
  pc=nx;
  let x,y,z=(P[nx-2]|P[nx-1]<<8)<<16>>16;
  if(op==0)return E(0);
  else if(op==1)S[s++]=(P[nx-1]<<24)>>24;
  else if(op==2)S[s++]=P[nx-4]|P[nx-3]<<8|P[nx-2]<<16|P[nx-1]<<24;
  else if(op==3)s--;
  else if(op==4){S[s]=S[s-1];s++}
  else if(op==5){x=S[s-1];S[s-1]=S[s-2];S[s-2]=x}
  else if(op==6){S[s]=S[s-2];s++}
  else if(op==7){x=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=x}
  else if(op==23)S[s-1]=-S[s-1];
  else if(op==27)S[s-1]=~S[s-1];
  else if(op>15&&op<35){
   y=S[s-1];x=S[s-2];
   if(op>18&&op<23&&!y)return E(4);
   s-=2;
   S[s++]=[x+y,x-y,Math.imul(x,y),x/y,x%y,(x>>>0)/(y>>>0),(x>>>0)%(y>>>0),0,x&y,x|y,x^y,0,x<<y,x>>y,x>>>y,0,x==y,x<y,(x>>>0)<(y>>>0)][op-16];
  }
  else if(op==48)pc=nx+z;
  else if(op==49||op==50){y=S[--s];if(op==49?y==0:y!=0)pc=nx+z}
  else if(op==51){if(j==64)return E(7);K[j++]=nx;pc=z&65535}
  else if(op==52){if(!j)return E(8);pc=K[--j]}
  else if(op==64){x=S[s-1];if(x<0||x>255)return E(6);S[s-1]=M[x]}
  else if(op==65){x=S[s-1];y=S[s-2];if(x<0||x>255)return E(6);s-=2;M[x]=y}
  else if(op==80){y=S[s-1];let c=''+y;if(o+c.length>65536)return E(11);s--;U.set(Buffer.from(c),o);o+=c.length}
  else if(op==81){if(o+1>65536)return E(11);U[o++]=S[--s]&255}
  else if(op==82)S[s++]=q<Q.length?Q[q++]:-1;
  else return E(S[--s]&255);
 }
}
for(const g of d(A).sort()){
 const[u,e]=V(f(A+'/'+g+'/program.bin'),f(A+'/'+g+'/input.bin'));
 m(B+'/'+g,{recursive:true});
 w(B+'/'+g+'/stdout.bin',u);
 w(B+'/'+g+'/exit.txt',e+'\n');
}
