(function(){"use strict";var e={4762:function(e,t,s){var i=s(9963),n=s(6252);function a(e,t,s,i,a,o){const r=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n.Wm)(r)])}var o={},r=s(3744);const l=(0,r.Z)(o,[["render",a]]);var d=l,c=s(2119),u=(s(7658),s(3577));const h=e=>((0,n.dD)("data-v-7f25404f"),e=e(),(0,n.Cn)(),e),v={class:"btnContainer"},f=(0,n.Uk)(" Назад "),p={class:"container"},m={class:"leftContainer"},_={class:"containerTopBar"},g={class:"topbar"},w=["src"],y={class:"textContent"},b={class:"itemContent"},F={class:"text_conten_style"},k={class:"text_conten_style"},I={class:"text_conten_style"},D={class:"text_conten_style"},S={class:"posts"},V={key:0},L={key:1,class:"text_content"},P={class:"friendListContainer"},M={class:"friendList"},W=h((()=>(0,n._)("div",null,"Ещё..",-1))),x=[W];function C(e,t,s,a,o,r){const l=(0,n.up)("my-button-vue"),d=(0,n.up)("PreLoader"),c=(0,n.up)("post-item"),h=(0,n.up)("friends-list-item"),W=(0,n.up)("my-profile-friend-vue");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",v,[(0,n._)("div",null,[(0,n.Wm)(l,{onClick:t[0]||(t[0]=t=>e.$router.push("/")),class:"btn"},{default:(0,n.w5)((()=>[f])),_:1})])]),(0,n.Wm)(W,null,{default:(0,n.w5)((()=>[(0,n._)("div",p,[(0,n._)("div",m,[(0,n._)("div",_,[(0,n.wy)((0,n.Wm)(d,null,null,512),[[i.F8,o.visiblePreLoader]]),(0,n._)("div",g,[(0,n._)("div",null,[(0,n._)("img",{class:"imgProfile",src:o.friend.photo_200},null,8,w)]),(0,n._)("div",y,[(0,n.Uk)((0,u.zw)(o.friend.first_name)+" "+(0,u.zw)(o.friend.last_name)+" ",1),(0,n._)("div",b,[(0,n._)("div",F," Пол: "+(0,u.zw)(o.sex),1),(0,n._)("div",k," Взраст: "+(0,u.zw)(o.age),1),(0,n._)("div",I," Количество друзей: "+(0,u.zw)(o.friendsCount),1),(0,n._)("div",D," Общих друзей: "+(0,u.zw)(o.mutualFriendsCount),1)])])])]),(0,n._)("div",S,[(0,n.wy)((0,n.Wm)(d,null,null,512),[[i.F8,o.visiblePreLoaderPosts]]),o.posts.length>0?((0,n.wg)(),(0,n.iD)("div",V,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.posts,(e=>((0,n.wg)(),(0,n.j4)(c,{post:e,key:e.id},null,8,["post"])))),128))])):((0,n.wg)(),(0,n.iD)("div",L,(0,u.zw)(o.noPosts),1))])]),(0,n._)("div",P,[(0,n.wy)((0,n.Wm)(d,null,null,512),[[i.F8,o.visiblePreLoaderFriends]]),(0,n._)("div",M,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.friendsUser,(e=>((0,n.wg)(),(0,n.j4)(h,{friend:e,key:e.id},null,8,["friend"])))),128))]),(0,n._)("div",{iv:"",class:"addFriendList",onClick:t[1]||(t[1]=(...e)=>r.requestOffsetFriendList&&r.requestOffsetFriendList(...e))},x)])])])),_:1})],64)}const O={class:"container"};function U(e,t,s,i,a,o){return(0,n.wg)(),(0,n.iD)("div",O,[(0,n.WI)(e.$slots,"default",{},void 0,!0)])}var A={name:"my-profile"};const B=(0,r.Z)(A,[["render",U],["__scopeId","data-v-a20db946"]]);var $=B,q=s(8605);const z=["src"],T={class:"borderBottomFriend"},Z={class:"containerFriend"},j={class:"text_content"},R={class:"mutual"};function H(e,t,s,i,a,o){return(0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("button",{class:"container",onClick:t[0]||(t[0]=t=>e.$router.push(`/profile/${s.friend.id}`))},[(0,n._)("img",{class:"imgFriend",src:s.friend.photo_50},null,8,z),(0,n._)("div",T,[(0,n._)("div",Z,[(0,n._)("div",j,(0,u.zw)(s.friend.first_name)+" "+(0,u.zw)(s.friend.last_name),1),(0,n._)("div",R,(0,u.zw)(s.friend.mutual),1)])])])])}var K={data(){return{}},props:{friend:{type:Object}},mounted(){}};const Y=(0,r.Z)(K,[["render",H],["__scopeId","data-v-6de9ae4a"]]);var G=Y;const J={key:0},N={class:"container"},E={key:0},Q={class:"textContent"},X=["src"],ee={key:1,class:"textContent"};function te(e,t,s,i,a,o){return void 0!=s.post.attachments&&void 0!=s.post.text?((0,n.wg)(),(0,n.iD)("div",J,[(0,n._)("div",N,[void 0!=this.post.attachments&&void 0!=this.post.attachments[0].photo?((0,n.wg)(),(0,n.iD)("div",E,[(0,n._)("div",Q,(0,u.zw)(s.post.text),1),(0,n._)("img",{class:"img",src:this.post.attachments[0].photo.sizes[3].url},null,8,X)])):((0,n.wg)(),(0,n.iD)("div",ee,(0,u.zw)(s.post.text),1))])])):(0,n.kq)("",!0)}var se={data(){return{}},props:{post:{type:Object}},mounted(){}};const ie=(0,r.Z)(se,[["render",te],["__scopeId","data-v-80072e5c"]]);var ne=ie;const ae={class:"btn"};function oe(e,t,s,i,a,o){return(0,n.wg)(),(0,n.iD)("div",ae,[(0,n.WI)(e.$slots,"default")])}var re={name:"my-button"};const le=(0,r.Z)(re,[["render",oe]]);var de=le;const ce={class:"lds-dual-ring"};function ue(e,t,s,i,a,o){return(0,n.wg)(),(0,n.iD)("div",ce)}var he={name:"my-pre-loader"};const ve=(0,r.Z)(he,[["render",ue],["__scopeId","data-v-7951383a"]]);var fe=ve,pe={components:{MyProfileFriendVue:$,FriendsListItem:G,PostItem:ne,MyButtonVue:de,PreLoader:fe},data(){return{MyAccessToken:localStorage.getItem("token"),friendsUser:{},friend:{},friendsCount:"",mutualFriendsCount:"",sex:"",age:"",posts:"",noPosts:"Записей нет",offsetValue:0,newDataFriendList:{},visiblePreLoader:!1,visiblePreLoaderPosts:!1,visiblePreLoaderFriends:!1,myUserId:""}},methods:{async requestUserGet(){this.visiblePreLoader=!0;try{await(0,q.R)("https://api.vk.com/method/users.get",{user_ids:`${this.$route.params.id}`,fields:"photo_200, sex, bdate, can_post",v:"5.131",access_token:this.MyAccessToken}).then((e=>{this.friend=e.response[0],this.sex=this.friend.sex,2==this.sex?this.sex="М":1==this.sex&&(this.sex="Ж"),this.age=((new Date).getTime()-new Date(this.friend.bdate))/315576e5|0,0==this.age&&(this.age="-")}))}catch(e){console.log(e)}this.visiblePreLoader=!1},async requestFriendsUser(){this.visiblePreLoaderFriends=!0;try{await(0,q.R)("https://api.vk.com/method/friends.search",{user_id:`${this.$route.params.id}`,count:"8",fields:"photo_50",v:"5.131",access_token:this.MyAccessToken}).then((e=>{this.friendsCount=e.response.count,this.friendsUser=e.response.items}))}catch(e){console.log(e)}this.visiblePreLoaderFriends=!1},async requestMutualFriends(){try{await(0,q.R)("https://api.vk.com/method/friends.getMutual?",{source_uid:this.myUserId,target_uid:`${this.$route.params.id}`,v:"5.131",access_token:this.MyAccessToken}).then((e=>{this.mutualFriendsCount=e.response.length}))}catch(e){console.log(e)}},async requestWallGet(){this.visiblePreLoaderPosts=!0;try{await(0,q.R)("https://api.vk.com/method/wall.get",{owner_id:`${this.$route.params.id}`,v:"5.131",access_token:this.MyAccessToken}).then((e=>{this.posts=e.response.items}))}catch(e){console.log(e)}this.visiblePreLoaderPosts=!1},async requestOffsetFriendList(){this.offsetValue+=8;try{await(0,q.R)("https://api.vk.com/method/friends.search?",{user_id:`${this.$route.params.id}`,count:"15",offset:String(this.offsetValue),fields:"photo_50",v:"5.131",access_token:this.MyAccessToken}).then((e=>{this.newDataFriendList=e.response.items,this.newDataFriendList.forEach((e=>{this.friendsUser.push(e)}))}))}catch(e){console.log(e)}}},mounted(){this.myUserId=localStorage.getItem("userId"),console.log(this.myUserId),this.requestFriendsUser(),this.requestUserGet(),this.requestMutualFriends(),this.requestWallGet()}};const me=(0,r.Z)(pe,[["render",C],["__scopeId","data-v-7f25404f"]]);var _e=me;const ge=e=>((0,n.dD)("data-v-22b9d2b1"),e=e(),(0,n.Cn)(),e),we={class:"main-container"},ye={class:"app__btns"},be=(0,n.Uk)("Построить"),Fe={class:"container"},ke=ge((()=>(0,n._)("h4",{class:"text_content"},"Войти в приложение",-1))),Ie={class:"signIn_container"},De={class:"text_content",href:"https://oauth.vk.com/authorize?client_id=51428350&display=popup&redirect_uri=https://lyashka.github.io/SPA-VK/&scope=friends&response_type=token&v=v=5.131"},Se=(0,n.Uk)("Войти"),Ve={class:"exitBtn"},Le=(0,n.Uk)("Выйти");function Pe(e,t,s,a,o,r){const l=(0,n.up)("my-button"),d=(0,n.up)("my-select"),c=(0,n.up)("friends-list-vue"),h=(0,n.up)("PreLoader"),v=(0,n.up)("my-window-friend-list-vue"),f=(0,n.up)("my-sign-in-vue");return(0,n.wg)(),(0,n.iD)("div",we,[(0,n._)("div",null,[(0,n._)("div",ye,[(0,n._)("div",null,[(0,n.wy)((0,n.Wm)(l,{class:"text_content",onClick:r.buildListFriends},{default:(0,n.w5)((()=>[be])),_:1},8,["onClick"]),[[i.F8,o.buildBtnVisible]])]),(0,n._)("div",null,[(0,n.wy)((0,n.Wm)(d,{class:"text_content",modelValue:o.selectedSort,"onUpdate:modelValue":t[0]||(t[0]=e=>o.selectedSort=e),options:o.sortoption},null,8,["modelValue","options"]),[[i.F8,!0]])])]),(0,n._)("div",Fe,[(0,n._)("div",null,[(0,n.Wm)(v,null,{default:(0,n.w5)((()=>[(0,n.wy)((0,n.Wm)(c,{class:"list_content",localStorageDataFriend:o.localStorageDataFriend},null,8,["localStorageDataFriend"]),[[i.F8,!0]]),(0,n.wy)((0,n.Wm)(h,{class:"preLoader"},null,512),[[i.F8,o.visiblePreLoader]])])),_:1})])]),(0,n._)("div",{class:"addFriendList",onClick:t[1]||(t[1]=(...e)=>r.requestOffsetFriendList&&r.requestOffsetFriendList(...e))},[(0,n._)("div",null,(0,u.zw)(o.offsetBtn),1)]),(0,n.Wm)(f,{show:o.signInWindowVisible,"onUpdate:show":t[2]||(t[2]=e=>o.signInWindowVisible=e)},{default:(0,n.w5)((()=>[ke,(0,n._)("div",Ie,[(0,n._)("a",De,[(0,n.Wm)(l,{class:"signInBtn",onClick:r.showWindowHide},{default:(0,n.w5)((()=>[Se])),_:1},8,["onClick"])])])])),_:1},8,["show"])]),(0,n._)("div",Ve,[(0,n.Wm)(l,{class:"text_content",onClick:r.exitCkick},{default:(0,n.w5)((()=>[Le])),_:1},8,["onClick"])])])}function Me(e,t,s,a,o,r){const l=(0,n.up)("friends-list-item-vue");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",null,[(0,n.Wm)(i.W3,{name:"friend-list"},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.localStorageDataFriend,(e=>((0,n.wg)(),(0,n.j4)(l,{friend:e,key:e.id},null,8,["friend"])))),128))])),_:1})])])}var We={components:{FriendsListItemVue:G},data(){return{mutualIndex:JSON.parse(localStorage.getItem("mutualCountsFriends"))}},props:{localStorageDataFriend:{localStorageDataFriend:Array}},mounted(){}};const xe=(0,r.Z)(We,[["render",Me],["__scopeId","data-v-02ad6fe9"]]);var Ce=xe;const Oe=e=>((0,n.dD)("data-v-fa7c89a4"),e=e(),(0,n.Cn)(),e),Ue=Oe((()=>(0,n._)("option",{disabled:"",value:""},"Сортировать",-1))),Ae=["value"];function Be(e,t,s,a,o,r){return(0,n.wy)(((0,n.wg)(),(0,n.iD)("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.modelValue=e),onChange:t[1]||(t[1]=(...e)=>r.changeOption&&r.changeOption(...e)),class:"select"},[Ue,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.options,(e=>((0,n.wg)(),(0,n.iD)("option",{key:e.value,value:e.value},(0,u.zw)(e.name),9,Ae)))),128))],544)),[[i.bM,s.modelValue]])}var $e={name:"my-select",props:{modelValue:{type:String},options:{type:Array,default:()=>[]}},methods:{changeOption(e){this.$emit("update:modelValue",e.target.value)}}};const qe=(0,r.Z)($e,[["render",Be],["__scopeId","data-v-fa7c89a4"]]);var ze=qe;const Te=e=>((0,n.dD)("data-v-c3ad7a46"),e=e(),(0,n.Cn)(),e),Ze={class:"dialog__content"},je=Te((()=>(0,n._)("div",{class:"topBar"},null,-1)));function Re(e,t,s,i,a,o){return(0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",Ze,[je,(0,n.WI)(e.$slots,"default",{},void 0,!0)])])}var He={name:"my-windowList",methods:{}};const Ke=(0,r.Z)(He,[["render",Re],["__scopeId","data-v-c3ad7a46"]]);var Ye=Ke;const Ge={class:"signIn_container"},Je={class:"signIn_content"};function Ne(e,t,s,i,a,o){return(0,n.wg)(),(0,n.iD)("div",Ge,[(0,n._)("div",Je,[(0,n.WI)(e.$slots,"default",{},void 0,!0)])])}var Ee={name:"my-sigIn",props:{show:{type:Boolean,default:!0}},methods:{hideWindow(){this.$emit("update:show",!0)}}};const Qe=(0,r.Z)(Ee,[["render",Ne],["__scopeId","data-v-7bd04371"]]);var Xe=Qe,et={components:{FriendsListVue:Ce,MyWindowFriendListVue:Ye,MyButton:de,MySelect:ze,MySignInVue:Xe,PreLoader:fe},data(){return{offsetValueProfileFriend:0,offsetBtn:"...",MyAccessToken:"",dataFriends:[],selectedSort:"",sortoption:[{value:"first_name",name:"По имени"},{value:"last_name",name:"По фамилии"},{value:"mutual",name:"Общие друзья"}],source_uid_user:"",localeStorageMutualFriends:[],newData:[],valueMutual:0,dataFriendsAndMutual:[],localStorageDataFriend:[],signInWindowVisible:!0,buildBtnVisible:!0,visiblePreLoader:!1}},methods:{exitCkick(){this.buildBtnVisible=!0,localStorage.clear(),location.reload()},showWindowHide(){this.signInWindowVisible=!1,localStorage.setItem("signInWindowVisible",this.signInWindowVisible)},buildListFriends(){this.getUrlParamUserId(),this.getUrlParam(),this.requestFriendlList(),this.selectVisible=!0,this.selectedSort="",this.buildBtnVisible=!1,localStorage.setItem("buildBtnVisible",this.buildBtnVisible)},requestFriendlList(){this.visiblePreLoader=!0,(0,q.R)("https://api.vk.com/method/friends.search?",{count:"8",fields:"photo_50",v:"5.131",access_token:this.MyAccessToken}).then((e=>{this.dataFriends=e.response.items,this.requestMutualFriends(this.dataFriends)}))},async requestMutualFriends(e){for(const t of e)await(0,q.R)("https://api.vk.com/method/friends.getMutual?",{source_uid:`${this.source_uid_user}`,target_uid:`${t.id}`,v:"5.131",access_token:this.MyAccessToken}).then((e=>{this.valueMutual=e.response.length,t["mutual"]=this.valueMutual,this.dataFriendsAndMutual.push(t)}));this.visiblePreLoader=!1,this.localStorageDataFriend=this.dataFriendsAndMutual,localStorage.setItem("localStorageDataFriend",JSON.stringify(this.dataFriendsAndMutual))},async requestOffsetFriendList(){this.offsetBtn="...",this.dataFriendsAndMutual=this.localStorageDataFriend,this.offsetValueProfileFriend=this.dataFriendsAndMutual.length+8,await(0,q.R)("https://api.vk.com/method/friends.search?",{count:"8",offset:String(this.offsetValueProfileFriend),fields:"photo_50",v:"5.131",access_token:this.MyAccessToken}).then((e=>{this.newData=e.response.items,this.requestMutualFriends(this.newData)}))},getUrlParam(){const e=window.location.href,t=e.match(/(?:#|#.+&)access_token=([^&]+)/)[1];localStorage.setItem("token",t),this.MyAccessToken=t},getUrlParamUserId(){const e=window.location.href,t=e.match(/(?:#|#.+&)user_id=([^&]+)/)[1];localStorage.setItem("userId",t),this.source_uid_user=t}},mounted(){this.buildBtnVisible=localStorage.getItem("buildBtnVisible"),null==this.buildBtnVisible?this.buildBtnVisible=!0:this.buildBtnVisible=!1,this.signInWindowVisible=localStorage.getItem("signInWindowVisible"),this.MyAccessToken=localStorage.getItem("token"),this.source_uid_user=localStorage.getItem("userId"),null==this.signInWindowVisible&&(this.signInWindowVisible=!0),this.localStorageDataFriend=JSON.parse(localStorage.getItem("localStorageDataFriend"))},watch:{selectedSort(e){"mutual"!=e?this.localStorageDataFriend.sort(((t,s)=>t[e]?.localeCompare(s[e]))):"mutual"==e&&this.localStorageDataFriend.sort(((e,t)=>t.mutual-e.mutual))}}};const tt=(0,r.Z)(et,[["render",Pe],["__scopeId","data-v-22b9d2b1"]]);var st=tt;const it=[{path:"/",component:st},{path:"/profile/:id",component:_e}],nt=(0,c.p7)({routes:it,history:(0,c.PO)("/SPA-VK/")});var at=nt;(0,i.ri)(d).use(at).mount("#app")}},t={};function s(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,i,n,a){if(!i){var o=1/0;for(c=0;c<e.length;c++){i=e[c][0],n=e[c][1],a=e[c][2];for(var r=!0,l=0;l<i.length;l++)(!1&a||o>=a)&&Object.keys(s.O).every((function(e){return s.O[e](i[l])}))?i.splice(l--,1):(r=!1,a<o&&(o=a));if(r){e.splice(c--,1);var d=n();void 0!==d&&(t=d)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[i,n,a]}}(),function(){s.d=function(e,t){for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,i){var n,a,o=i[0],r=i[1],l=i[2],d=0;if(o.some((function(t){return 0!==e[t]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(l)var c=l(s)}for(t&&t(i);d<o.length;d++)a=o[d],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(c)},i=self["webpackChunkmy_app"]=self["webpackChunkmy_app"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(4762)}));i=s.O(i)})();
//# sourceMappingURL=app.43e67cb6.js.map