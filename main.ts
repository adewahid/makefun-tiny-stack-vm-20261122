import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const A=process.env.MAKEFUN_INPUT_DIR||'/input',B=process.env.MAKEFUN_OUTPUT_DIR||'/output';
function V(P,Q){
 const S=new Int32Array(256),K=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536);
 let s=0,j=0,pc=0,n=0,o=0,q=0;
 const E=x=>[U.subarray(0,o),x];
 for(;;){
  if(n==1e6)return E(10);
  if(pc<0||pc>=P.length)return E(9);
  let op=P[pc];
  if(!(op<8||op>15&&op<31||op>31&&op<35||op>47&&op<53||op>63&&op<66||op>79&&op<84))return E(5);
  let im=op==1?1:op==2?4:op>47&&op<52?2:0;
  if(pc+im>=P.length)return E(9);
  n++;
  let nx=pc+1+im,pp=op==7?3:op==3||op==4||op==23||op==27||op>48&&op<51||op==64||op>79&&op<82||op==83?1:op==5||op==6||op==65||op>15&&op<35?2:0,pu=op==1||op==2||op==64||op==82||op>15&&op<35?1:op==4?2:op==6||op==7?3:op==5?2:0;
  if(s<pp)return E(2);
  if(s-pp+pu>256)return E(3);
  pc=nx;
  let x,y;
  if(op==0)return E(0);
  else if(op==1)S[s++]=(P[nx-1]<<24)>>24;
  else if(op==2)S[s++]=P[nx-4]|P[nx-3]<<8|P[nx-2]<<16|P[nx-1]<<24;
  else if(op==3)s--;
  else if(op==4){S[s]=S[s-1];s++}
  else if(op==5){x=S[s-1];S[s-1]=S[s-2];S[s-2]=x}
  else if(op==6){S[s]=S[s-2];s++}
  else if(op==7){x=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=x}
  else if(op==23)S[s-1]=-S[s-1]|0;
  else if(op==27)S[s-1]=~S[s-1];
  else if(op>15&&op<35){
   y=S[s-1];x=S[s-2];
   if(op>18&&op<23&&!y)return E(4);
   s-=2;
   S[s++]=op==16?x+y|0:op==17?x-y|0:op==18?Math.imul(x,y):op==19?(x/y)|0:op==20?y==-1?0:x%y|0:op==21?Math.floor((x>>>0)/(y>>>0)):op==22?(x>>>0)%(y>>>0):op==24?x&y:op==25?x|y:op==26?x^y:op==28?x<<(y&31):op==29?x>>(y&31):op==30?x>>>(y&31):op==32?x==y?1:0:op==33?x<y?1:0:(x>>>0)<(y>>>0)?1:0;
  }
  else if(op==48)pc=nx+((P[nx-2]|P[nx-1]<<8)<<16>>16);
  else if(op==49||op==50){y=S[--s];if(op==49?y==0:y!=0)pc=nx+((P[nx-2]|P[nx-1]<<8)<<16>>16)}
  else if(op==51){if(j==64)return E(7);K[j++]=nx;pc=P[nx-2]|P[nx-1]<<8}
  else if(op==52){if(!j)return E(8);pc=K[--j]}
  else if(op==64){x=S[s-1];if(x<0||x>255)return E(6);S[s-1]=M[x]}
  else if(op==65){x=S[s-1];y=S[s-2];if(x<0||x>255)return E(6);s-=2;M[x]=y}
  else if(op==80){y=S[s-1];let d=''+y;if(o+d.length>65536)return E(11);s--;for(let z=0;z<d.length;z++)U[o++]=d.charCodeAt(z)}
  else if(op==81){if(o+1>65536)return E(11);U[o++]=S[--s]&255}
  else if(op==82)S[s++]=q<Q.length?Q[q++]:-1;
  else return E(S[--s]&255);
 }
}
for(const d of readdirSync(A).sort()){
 const[u,e]=V(readFileSync(join(A,d,'program.bin')),readFileSync(join(A,d,'input.bin')));
 mkdirSync(join(B,d),{recursive:true});
 writeFileSync(join(B,d,'stdout.bin'),u);
 writeFileSync(join(B,d,'exit.txt'),e+'\n');
}
