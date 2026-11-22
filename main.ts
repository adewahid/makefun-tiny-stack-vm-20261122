import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
function R(P,Q){
 const N=P.length,S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536),D=new Int32Array(12);
 let p=0,c=0,l=0,i=0,k=0,t=0;
 const T=x=>[U.subarray(0,l),x];
 for(;;){
  if(t===1e6)return T(10);
  if(k<0||k>=N)return T(9);
  const o=P[k];
  if(!(o<8||o>15&&o<35||o>47&&o<53||o>63&&o<66||o>79&&o<84))return T(5);
  const m=o===1?1:o===2?4:o>47&&o<52?2:0;
  if(k+m>=N)return T(9);
  t++;
  const q=o===7?3:o===3||o===4||o===23||o===27||o===49||o===50||o===64||o===80||o===81||o===83?1:o>=16&&o<=34||o===5||o===6||o===65?2:0;
  const w=o===1||o===2||o===82||o>=16&&o<=34||o===64?1:o===4?2:o===6?3:o===5||o===7?q:0;
  if(p<q)return T(2);
  if(p-q+w>256)return T(3);
  const n=k+1+m;k=n;
  if(o===23){S[p-1]=-S[p-1]|0;continue}
  if(o===27){S[p-1]=~S[p-1];continue}
  if(o>=16&&o<=34){
   const b=S[p-1],a=S[p-2];let r;
   if(o===16)r=a+b|0;else if(o===17)r=a-b|0;else if(o===18)r=Math.imul(a,b);
   else if(o===19){if(!b)return T(4);r=(a/b)|0}
   else if(o===20){if(!b)return T(4);r=b===-1?0:a%b|0}
   else if(o===21){if(!b)return T(4);r=Math.floor((a>>>0)/(b>>>0))|0}
   else if(o===22){if(!b)return T(4);r=(a>>>0)%(b>>>0)|0}
   else if(o===24)r=a&b;else if(o===25)r=a|b;else if(o===26)r=a^b;
   else if(o===28)r=a<<(b&31);else if(o===29)r=a>>(b&31);else if(o===30)r=a>>>(b&31)|0;
   else if(o===32)r=a===b?1:0;else if(o===33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
   p-=2;S[p++]=r;continue;
  }
  switch(o){
   case 0:return T(0);
   case 1:S[p++]=(P[n-1]<<24)>>24;break;
   case 2:S[p++]=P[n-4]|P[n-3]<<8|P[n-2]<<16|P[n-1]<<24;break;
   case 3:p--;break;
   case 4:S[p]=S[p-1];p++;break;
   case 5:{const x=S[p-1];S[p-1]=S[p-2];S[p-2]=x;break}
   case 6:S[p]=S[p-2];p++;break;
   case 7:{const x=S[p-3];S[p-3]=S[p-2];S[p-2]=S[p-1];S[p-1]=x;break}
   case 48:k=n+((P[n-2]|P[n-1]<<8)<<16>>16);break;
   case 49:case 50:{const v=S[--p],r=(P[n-2]|P[n-1]<<8)<<16>>16;if(o===49?v===0:v!==0)k=n+r;break}
   case 51:if(c===64)return T(7);C[c++]=n;k=P[n-2]|P[n-1]<<8;break;
   case 52:if(!c)return T(8);k=C[--c];break;
   case 64:{const a=S[p-1];if(a<0||a>255)return T(6);S[p-1]=M[a];break}
   case 65:{const a=S[p-1],v=S[p-2];if(a<0||a>255)return T(6);p-=2;M[a]=v;break}
   case 80:{let v=S[p-1],n=0;const g=v<0;let a=g?-v:v;if(!a)D[n++]=48;else while(a>0){D[n++]=48+a%10;a=(a/10)|0}const z=n+(g?1:0);if(l+z>65536)return T(11);p--;if(g)U[l++]=45;for(let j=n-1;j>=0;j--)U[l++]=D[j];break}
   case 81:if(l+1>65536)return T(11);U[l++]=S[--p]&255;break;
   case 82:S[p++]=i<Q.length?Q[i++]:-1;break;
   case 83:return T(S[--p]&255);
  }
 }
}
for(const d of readdirSync(I).sort()){
 const[u,e]=R(readFileSync(join(I,d,'program.bin')),readFileSync(join(I,d,'input.bin')));
 mkdirSync(join(O,d),{recursive:true});
 writeFileSync(join(O,d,'stdout.bin'),u);
 writeFileSync(join(O,d,'exit.txt'),e+'\n');
}
