((global, factory) => {
  "use strict";
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory(
      require("global/window"),
      require("global/document")
    ))
    : typeof define === "function" && define.amd
      ? define(["global/window", "global/document"], factory)
      : factory(global.window, global.document);
    try {
      global.RdcEnv = document.createElement("rdc-env");
      global.document.body.appendChild(global.RdcEnv);
    } catch (error) {
      console.error('📢对不起：RdcEnv组件加载失败！\n\t解决方案1：将引入的<script src="./red-env.js">标签的位置移到<body>标签的最后面！\n\t解决方案2：在引入的<script async src="./rdc-env.js">标签中，加上async属性！\n', error);
    }
})(
  typeof window !== "undefined" ? window : globalThis || global || self,
  (win, doc) => {
    "use strict";
    win.customElements.define(
      "rdc-env",
      class extends HTMLElement {
        static get observedAttributes() {
          return {
            env: String,
            obj: {
              type: Number,
              readonly: Boolean,
            },
          };
        }
        constructor(ops) {
          super(ops);
          this.oStyle = doc.createElement("style");
          this.oDialog = doc.createElement("dialog");
          this.render();
        }
        create() {
          this.oDialog.open = true;
          this.oStyle.type = "text/css";
          this.oStyle.innerHTML = `.env-dialog{position:fixed;top:0;left:0;display:flex;justify-content:center;align-items:center;pointer-events:none;width:100vw;height:20px;color:#fff;border:0;background:rgba(0, 200, 0, 0.5);}`;
          this.oDialog.className = "env-dialog";
          this.oDialog.innerText = `开发环境！`;
          return this;
        }
        render() {
          this.create();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.appendChild(this.oStyle);
          shadow.appendChild(this.oDialog);
          return shadow;
        }
        show(env) {
          const arr = location.origin.match(/dev|test/g);
          this.oDialog.innerText = `${env ? env : arr ? arr[0] : "•••"} 环境！`;
          this.style.display = "block";
        }
        hide() {
          this.style.display = "none";
        }
        connectedCallback() {
          this.addEventListener("click", () => {
            this.hide();
          });
        }
      }
    );
  }
);
