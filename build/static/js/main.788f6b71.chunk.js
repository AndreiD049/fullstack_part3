(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(2),r=t(0),c=t.n(r),u=t(13),o=t.n(u),i=function(e){var n=e.person,t=e.removeHandler;return c.a.createElement("div",null,n.name," - ",n.number," ",c.a.createElement("button",{onClick:function(){return t(n)}},"delete"))},l=function(e){var n=e.persons,t=e.removeHandler;return n.map((function(e){return c.a.createElement(i,{key:e.name,person:e,removeHandler:t})}))},m=function(e){var n=e.handleFilter,t=e.filterValue;return c.a.createElement("div",null,"Filter shown with: ",c.a.createElement("input",{value:t,onChange:n}))},f=function(e){return c.a.createElement("form",{onSubmit:e.handleSubmit},c.a.createElement("div",null,"name: ",c.a.createElement("input",{value:e.newName,onChange:e.handleNameChange,required:!0})),c.a.createElement("div",null,"number: ",c.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange,required:!0})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.message,t=e.notificationType;return null===n?null:c.a.createElement("div",{className:t},n)},s=t(3),h=t.n(s),b="/api/persons",p=function(){return h.a.get(b).then((function(e){return e.data}))},v=function(e){return h.a.post(b,e).then((function(e){return e.data}))},E=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n="".concat(b,"/").concat(e);return h.a.delete(n)},w=(t(36),function(){var e=Object(r.useState)([]),n=Object(a.a)(e,2),t=n[0],u=n[1],o=Object(r.useState)(""),i=Object(a.a)(o,2),s=i[0],h=i[1],b=Object(r.useState)(""),w=Object(a.a)(b,2),j=w[0],O=w[1],N=Object(r.useState)(""),S=Object(a.a)(N,2),y=S[0],C=S[1],k=Object(r.useState)(null),H=Object(a.a)(k,2),F=H[0],R=H[1],T=Object(r.useState)("info"),q=Object(a.a)(T,2),x=q[0],J=q[1],V=y?B(y):t;Object(r.useEffect)((function(){p().then((function(e){u(e)}))}),[]);var A=function(e,n,t){J(n),R(e),setTimeout((function(){R(null)}),t)};function B(e){var n=new RegExp(".*".concat(e,".*"),"i");return t.filter((function(e){return n.test(e.name)}))}return c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),c.a.createElement(d,{message:F,notificationType:x}),c.a.createElement(m,{handleFilter:function(e){var n=e.target.value;C(n),B(n)},filterValue:y}),c.a.createElement("h2",null,"Add new:"),c.a.createElement(f,{newName:s,handleNameChange:function(e){h(e.target.value)},newNumber:j,handleNumberChange:function(e){O(e.target.value)},handleSubmit:function(e){function n(){h(""),O(""),C("")}if(e.preventDefault(),s){var a,r={name:s,number:j.replace(/[^\d+]/gi,"")};if(a=s,t.find((function(e){return e.name===a})))window.confirm("".concat(s," is already in the list. Replace the old number with a new one?"))&&(!function(e,n){E(e,n).then((function(a){A("".concat(n.name," successfully updated"),"info",3e3),u(t.map((function(n){return n.id===e?a:n})))})).catch((function(e){A("Unable to update person: ".concat(e.message),"error",5e3),p().then((function(e){return u(e)}))}))}(t.find((function(e){return e.name===s})).id,r),n());else if(/^\+?\d*\(?\d+\)?[\d-\s]+$/gi.test(j))v(r).then((function(e){A("".concat(e.name," was successfully added"),"info",3e3),u(t.concat(e)),n()}));else alert("".concat(j," is not valid."))}}}),c.a.createElement("h2",null,"Numbers"),c.a.createElement(l,{persons:V,removeHandler:function(e){window.confirm("Remove ".concat(e.name,"?"))&&g(e.id).then((function(){A("".concat(e.name," was removed"),"info",3e3),u(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){A("Error deleting person - ".concat(e.name," [").concat(n.message,"]"),"error",5e3),p().then((function(e){return u(e)}))}))}}))});o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(w,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.788f6b71.chunk.js.map