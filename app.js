/* 新能源30天打卡 · 本地数据全部存于 localStorage（key: nev30_v1） */
"use strict";

const STORE_KEY = "nev30_v1";
const DAY_MS = 86400000;

/* ---------- 28天课程数据 ---------- */
const DAYS = [
  // 第1周 全景+整车
  { w: 1, t: "行业全景", tasks: [
    { k: "video", n: "新能源汽车概论（国家级精品课131讲）· 先看开篇与技术路线分类章节", u: "https://www.bilibili.com/video/BV1VcemzoEDa" },
  ], q: ["BEV / PHEV / 增程 / FCEV 各自的技术路线差异是什么？"] },
  { w: 1, t: "纯电整车结构", tasks: [
    { k: "video", n: "同一课程 · 挑「纯电动汽车总体结构 / 驱动系统」相关讲次", u: "https://www.bilibili.com/video/BV1VcemzoEDa" },
  ], q: ["三电指什么？各自在整车上的位置和成本占比？"] },
  { w: 1, t: "电池总论", tasks: [
    { k: "video", n: "弗雷刘 · 硬核的锂离子电池——动力电池科普课（第1讲：概述/材料/电化学）", u: "https://www.bilibili.com/video/BV1UP4y1U7Rd" },
  ], q: ["充放电时锂离子怎么迁移？正负极材料体系有哪些？"] },
  { w: 1, t: "电驱总论", tasks: [
    { k: "search", n: "机电原理 · 电动汽车永磁同步电机结构与工作原理（30万+播放）", u: "https://search.bilibili.com/all?keyword=%E6%9C%BA%E7%94%B5%E5%8E%9F%E7%90%86%20%E7%94%B5%E5%8A%A8%E6%B1%BD%E8%BD%A6%E6%B0%B8%E7%A3%81%E5%90%8C%E6%AD%A5%E7%94%B5%E6%9C%BA" },
  ], q: ["电机/减速器/逆变器各自干什么？为什么电动车少用多挡变速箱？"] },
  { w: 1, t: "混动 Ⅰ · 功率分流与并联", tasks: [
    { k: "search", n: "纸上谈车17 · 比亚迪DM混动系统工作原理", u: "https://search.bilibili.com/all?keyword=%E7%BA%B8%E4%B8%8A%E8%B0%88%E8%BD%A6%20%E6%AF%94%E4%BA%9A%E8%BF%AA%20DM%20%E6%B7%B7%E5%8A%A8" },
    { k: "search", n: "果冻啊果冻啊果冻 · 行星排杠杆法讲功率分流", u: "https://search.bilibili.com/all?keyword=%E6%9E%9C%E5%86%BB%E5%95%8A%E6%9E%9C%E5%86%BB%E5%95%8A%E6%9E%9C%E5%86%BB%20%E8%A1%8C%E6%98%9F%E6%8E%92" },
  ], q: ["丰田THS功率分流与比亚迪DM-i并联直驱的本质区别？"] },
  { w: 1, t: "混动 Ⅱ · 多档DHT与增程", tasks: [
    { k: "video", n: "吉利雷神3挡DHT原理（含各家DHT对比）", u: "https://www.bilibili.com/video/BV17r421K7Uw" },
    { k: "search", n: "「混动技术哪家强」系列（持续更新，看最新一期）", u: "https://search.bilibili.com/all?keyword=%E6%B7%B7%E5%8A%A8%E6%8A%80%E6%9C%AF%E5%93%AA%E5%AE%B6%E5%BC%BA" },
  ], q: ["多档DHT比单档好在哪、付出什么代价？增程为什么「落后但好用」？"] },
  { w: 1, t: "机动 / 复盘", tasks: [
    { k: "practice", n: "画一页「混动架构对比」手写笔记 + 补进度", note: "本周产出：BEV/PHEV/REEV/FCEV × 结构/优缺点/代表车型 对比表" },
  ], q: ["一周对比表完成了吗？"] },

  // 第2周 动力系统深入
  { w: 2, t: "电化学与材料", tasks: [
    { k: "video", n: "锂离子电池基础课程（13集）：原理 / 关键参数 / 测试技术", u: "https://www.bilibili.com/video/BV1wh4y1871N" },
    { k: "video", n: "（选）山东科技大学《锂离子电池》深入版", u: "https://www.bilibili.com/video/BV1Zi4y1x7b5" },
  ], q: ["三元 vs 磷酸铁锂在能量密度/安全/成本/低温上怎么取舍？", "SOC / SOH / DOD / C-rate 的定义？"] },
  { w: 2, t: "电池包工程", tasks: [
    { k: "search", n: "CTP / CTC 电池包结构 · 宁德麒麟电池、比亚迪刀片电池讲解", u: "https://search.bilibili.com/all?keyword=CTP%20CTC%20%E7%94%B5%E6%B1%A0%E5%8C%85%E7%BB%93%E6%9E%84%20%E9%BA%92%E9%BA%9F%E7%94%B5%E6%B1%A0" },
  ], q: ["模组→无模组解决了什么？刀片电池「安全」的原理？"] },
  { w: 2, t: "BMS 电池管理", tasks: [
    { k: "search", n: "BMS 电池管理系统原理：SOC估计 / 均衡 / 热失控", u: "https://search.bilibili.com/all?keyword=BMS%20%E7%94%B5%E6%B1%A0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20%E5%8E%9F%E7%90%86" },
  ], q: ["SOC为什么难估？主动均衡 vs 被动均衡？"] },
  { w: 2, t: "电机深入", tasks: [
    { k: "video", n: "永磁同步电机工作原理、控制方式与应用场合", u: "https://www.bilibili.com/video/BV1UNy3B9EHq" },
    { k: "doc", n: "（选）《现代永磁同步电机控制原理及MATLAB仿真》翻目录即可", note: "京东/微信读书有售，本月不精读" },
  ], q: ["额定点/峰值/弱磁扩速区怎么理解？扁线、油冷为什么流行？"] },
  { w: 2, t: "电机控制 · FOC入门", tasks: [
    { k: "search", n: "FOC入门完整教程（原理-硬件-软件，看原理篇）", u: "https://search.bilibili.com/all?keyword=FOC%E5%85%A5%E9%97%A8%E5%AE%8C%E6%95%B4%E6%95%99%E7%A8%8B" },
  ], q: ["FOC矢量控制与直流电机调压调速的区别？坐标变换在干什么？"] },
  { w: 2, t: "电控与功率器件", tasks: [
    { k: "search", n: "IGBT vs SiC、800V高压平台讲解", u: "https://search.bilibili.com/all?keyword=IGBT%20SiC%20800V%20%E7%94%B5%E9%A9%B1" },
  ], q: ["SiC贵在哪、值在哪？800V带来哪些系统性变化（充电/线束/绝缘）？"] },
  { w: 2, t: "机动 / 复盘", tasks: [
    { k: "practice", n: "整理「电池参数表」和「电驱参数表」各一页", note: "能给别人讲清电池包与电驱总成的构成和关键指标" },
  ], q: ["两张参数表完成了吗？"] },

  // 第3周 仿真
  { w: 3, t: "系统级仿真总览", tasks: [
    { k: "search", n: "艾迪捷（GT-SUITE中国代理）· GT-SUITE基础培训-软件介绍", u: "https://search.bilibili.com/all?keyword=%E8%89%BE%E8%BF%AA%E6%8D%B7%20GT-SUITE%20%E5%9F%BA%E7%A1%80%E5%9F%B9%E8%AE%AD" },
  ], q: ["CLTC / WLTC 工况是什么？新能源经济性仿真比传统车多了哪些部件模型？"] },
  { w: 3, t: "整车建模思路", tasks: [
    { k: "search", n: "GT-SUITE 暑期培训 · 整车动力性经济性（看前2小时即可）", u: "https://search.bilibili.com/all?keyword=GT-SUITE%20%E6%9A%91%E6%9C%9F%E5%9F%B9%E8%AE%AD%20%E6%95%B4%E8%BD%A6" },
    { k: "search", n: "（选）王彦章 · GT-SUITE系统级仿真20讲", u: "https://search.bilibili.com/all?keyword=%E7%8E%8B%E5%BD%A6%E7%AB%A0%20GT-SUITE%20%E7%B3%BB%E7%BB%9F%E7%BA%A7%E4%BB%BF%E7%9C%9F" },
  ], q: ["1D系统仿真与3D CFD的分工边界在哪？"] },
  { w: 3, t: "电池建模", tasks: [
    { k: "search", n: "Simulink 电池等效电路建模（MathWorks官方优先）", u: "https://search.bilibili.com/all?keyword=Simulink%20%E7%94%B5%E6%B1%A0%20%E7%AD%89%E6%95%88%E7%94%B5%E8%B7%AF%20%E5%BB%BA%E6%A8%A1" },
  ], q: ["Rint / Thevenin模型区别？SOC-OCV曲线、HPPC标定是什么？"] },
  { w: 3, t: "电池热管理仿真", tasks: [
    { k: "video", n: "电池热管理设计与电池热仿真教程合集（Fluent/STAR-CCM+）", u: "https://www.bilibili.com/video/BV1sF411C7aS" },
    { k: "video", n: "（案例）陶若虚 · 18650锂电池风冷热管理仿真", u: "https://www.bilibili.com/video/BV1Y24y1k7SX" },
    { k: "search", n: "（选）适合初学者的STAR-CCM+教程", u: "https://search.bilibili.com/all?keyword=STAR-CCM%2B%20%E5%88%9D%E5%AD%A6%E8%80%85%E6%95%99%E7%A8%8B" },
  ], q: ["液冷板仿真的典型流程（几何→共轭传热→工况）？风冷/液冷/相变的适用边界？"] },
  { w: 3, t: "Amesim 系统仿真", tasks: [
    { k: "video", n: "Amesim视频教程（32集，2025新版）", u: "https://www.bilibili.com/video/BV1EkkXBXE2j" },
    { k: "video", n: "（选）AMESim系列教程26集 · 含冷却系统篇", u: "https://www.bilibili.com/video/BV1qE411L727" },
  ], q: ["Amesim与GT-SUITE的定位差异？热管理回路（泵-阀-Chiller-散热器）怎么搭？"] },
  { w: 3, t: "电机仿真与联合仿真", tasks: [
    { k: "search", n: "PMSM Simulink 矢量控制仿真（跑通一个FOC示例）", u: "https://search.bilibili.com/all?keyword=PMSM%20Simulink%20%E7%9F%A2%E9%87%8F%E6%8E%A7%E5%88%B6%20%E4%BB%BF%E7%9C%9F" },
    { k: "practice", n: "顺带搞懂 MIL / SIL / HIL 三个概念", note: "重点：被控对象与控制器在仿真里怎么分工" },
  ], q: ["电机控制仿真里「被控对象」和「控制器」怎么分？HIL解决什么问题？"] },
  { w: 3, t: "综合实践", tasks: [
    { k: "video", n: "纯电动汽车Simulink建模（带模型，跟做纵向动力学+工况）", u: "https://www.bilibili.com/video/BV1CxLE6wERF" },
    { k: "video", n: "（选）Simulink车辆动力学建模·小白入门", u: "https://www.bilibili.com/video/BV1BV41177je" },
  ], q: ["跑通一个纵向动力学+工况能耗模型了吗？"] },

  // 第4周 泛新能源+产业
  { w: 4, t: "储能", tasks: [
    { k: "search", n: "绿能学堂 · 零基础也能看懂的储能产业链（10分钟）+ 其储能系列", u: "https://search.bilibili.com/all?keyword=%E7%BB%BF%E8%83%BD%E5%AD%A6%E5%A0%82%20%E5%82%A8%E8%83%BD%E4%BA%A7%E4%B8%9A%E9%93%BE" },
    { k: "search", n: "（选）国家智慧教育平台《储能原理与技术》挑讲次", u: "https://search.bilibili.com/all?keyword=%E5%82%A8%E8%83%BD%E5%8E%9F%E7%90%86%E4%B8%8E%E6%8A%80%E6%9C%AF%20%E8%AF%BE%E7%A8%8B" },
  ], q: ["电芯→Pack→PCS→EMS→电站怎么串起来？动力电池厂为何纷纷做储能？"] },
  { w: 4, t: "光伏 / 风电", tasks: [
    { k: "search", n: "光伏发电原理 入门科普", u: "https://search.bilibili.com/all?keyword=%E5%85%89%E4%BC%8F%E5%8F%91%E7%94%B5%E5%8E%9F%E7%90%86%20%E5%85%A5%E9%97%A8" },
    { k: "search", n: "风力发电原理 动画", u: "https://search.bilibili.com/all?keyword=%E9%A3%8E%E5%8A%9B%E5%8F%91%E7%94%B5%E5%8E%9F%E7%90%86%20%E5%8A%A8%E7%94%BB" },
  ], q: ["风光间歇性如何引出储能需求？「新型电力系统」的框架是什么？"] },
  { w: 4, t: "氢能与燃料电池", tasks: [
    { k: "video", n: "氢燃料电池三维动画演示（先建立直觉）", u: "https://www.bilibili.com/video/BV19J4m1T7DB" },
    { k: "search", n: "四川大学《氢能与燃料电池》· 挑制氢/储氢/PEMFC原理讲次", u: "https://search.bilibili.com/all?keyword=%E5%9B%9B%E5%B7%9D%E5%A4%A7%E5%AD%A6%20%E6%B0%A2%E8%83%BD%E4%B8%8E%E7%87%83%E6%96%99%E7%94%B5%E6%B1%A0" },
  ], q: ["PEMFC的工作原理？氢的制-储-运-加瓶颈在哪？"] },
  { w: 4, t: "产业与政策", tasks: [
    { k: "doc", n: "精读《节能与新能源汽车技术路线图2.0》核心章节（PDF）", u: "https://29629267.s21i.faiusr.com/61/ABUIABA9GAAgut3ilwYomqqpag.pdf", note: "打开后可「分享→存储到文件」方便批注" },
    { k: "practice", n: "看电池联盟最新月度数据（公众号：中国汽车动力电池产业创新联盟）", note: "每月11日左右推送完整PDF" },
  ], q: ["2035年路线图的关键量化目标？当前动力电池装机格局？"] },
  { w: 4, t: "国际视角", tasks: [
    { k: "doc", n: "IEA《Global EV Outlook 2026》读 Executive Summary + 中国章节", u: "https://www.iea.org/reports/global-ev-outlook-2026", note: "页面内点 Download PDF 免费下载" },
  ], q: ["全球电动化进度、电池产能格局和中国的位置？"] },
  { w: 4, t: "综合复盘", tasks: [
    { k: "practice", n: "对照知识地图查漏 + 写一页《我理解的新能源》+ 定下阶段3个深入方向", note: "候选：①电池热管理仿真实操 ②能量管理策略 ③系统级整车建模" },
  ], q: ["5页周结 + 2张图（技术路线对比表、仿真工具版图）齐了吗？"] },
  { w: 4, t: "机动 / 收尾", tasks: [
    { k: "practice", n: "补漏、收藏夹清尾、导出全部笔记", note: "设置页可一键复制备份" },
  ], q: ["一个月打卡完成 🎉"] },
];

const RESOURCES = [
  { id: "r1", n: "《节能与新能源汽车技术路线图2.0》PDF（约65页）", d: "中国汽车工程学会官方 · 产业政策与技术路线总纲", u: "https://29629267.s21i.faiusr.com/61/ABUIABA9GAAgut3ilwYomqqpag.pdf", kind: "doc" },
  { id: "r2", n: "技术路线图2.0 官方发布页", d: "中国汽车工程学会 sae-china.org", u: "https://www.sae-china.org/news/society/202010/3957.html", kind: "doc" },
  { id: "r3", n: "IEA《Global EV Outlook 2026》", d: "全球电动车年度权威报告 · 页面内免费下载PDF（英文）", u: "https://www.iea.org/reports/global-ev-outlook-2026", kind: "doc" },
  { id: "r4", n: "IEA Global EV Data Explorer", d: "在线查询/导出全球电动车销量与保有量数据", u: "https://www.iea.org/data-and-statistics/data-tools/global-ev-data-explorer", kind: "doc" },
  { id: "r5", n: "MarkLines · 中国动力电池装车量数据", d: "汇总电池联盟历次月度发布记录", u: "https://www.marklines.com/cn/statisticalProductsList", kind: "doc" },
  { id: "r6", n: "发现报告", d: "券商深度研报免费下载 · 搜「新能源汽车 / 动力电池 / 储能」", u: "https://www.fxbaogao.com", kind: "doc" },
  { id: "r7", n: "MathWorks 中国官网", d: "站内搜 Battery Modeling / Electric Vehicle，免费电子书与研讨会回放", u: "https://ww2.mathworks.cn", kind: "doc" },
  { id: "r8", n: "知网 CNKI", d: "检索关键词：锂离子动力电池热管理综述 / 混合动力能量管理策略综述 / PMSM无位置传感器控制综述 / 固态电池研究进展", u: "https://www.cnki.net", kind: "doc" },
  { id: "r9", n: "《中国新能源汽车产业发展报告》（蓝皮书）", d: "年度图书 · 社科文献出版社，图书馆或京东获取", kind: "text" },
  { id: "r10", n: "公众号碎片阅读清单", d: "高工锂电（GGII）、电池中国、中国汽车报、乘联会（数据快讯）", kind: "text" },
];

const TAGS = { video: ["视频", "tag-video"], doc: ["文档", "tag-doc"], search: ["搜索", "tag-search"], practice: ["练习", "tag-practice"] };
const WEEK_TITLES = { 1: "第1周 · 全景+整车", 2: "第2周 · 电池+电驱", 3: "第3周 · 仿真", 4: "第4周 · 泛新能源+产业" };
const WEEK_SHORT = { 1: ["第1周", "全景+整车"], 2: ["第2周", "电池+电驱"], 3: ["第3周", "仿真"], 4: ["第4周", "泛新能源+产业"] };

/* ---------- 状态 ---------- */
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (s && s.startDate) return normalize(s);
  } catch (e) { /* ignore */ }
  return normalize({ startDate: todayStr(), days: {}, resources: {} });
}
function normalize(s) {
  s.days = s.days || {}; s.resources = s.resources || {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s.startDate)) s.startDate = todayStr();
  return s;
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function parseDate(str) { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); }
function fmtDate(d) { return (d.getMonth() + 1) + "月" + d.getDate() + "日"; }
function dayDate(i) { return new Date(parseDate(state.startDate).getTime() + (i - 1) * DAY_MS); }

function currentDay() {
  const diff = Math.floor((parseDate(todayStr()) - parseDate(state.startDate)) / DAY_MS) + 1;
  return Math.min(28, Math.max(1, diff));
}
function dayState(i) {
  return state.days[i] || (state.days[i] = { done: false, ts: 0, notes: "", tasks: [] });
}
function doneCount() { let n = 0; for (let i = 1; i <= 28; i++) if (state.days[i] && state.days[i].done) n++; return n; }
function streak() {
  const cur = currentDay(); let best = 0;
  for (let i = cur; i >= 1; i--) if (state.days[i] && state.days[i].done) { best = i; break; }
  let s = 0;
  for (let i = best; i >= 1; i--) { if (state.days[i] && state.days[i].done) s++; else break; }
  return s;
}

/* ---------- 渲染 ---------- */
let state = loadState();
let tab = "today";
let viewDay = currentDay();

function $(sel) { return document.querySelector(sel); }
function h(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._tm); t._tm = setTimeout(() => t.classList.remove("show"), 1800);
}
function bilibiliSearchUrl(kw) { return "https://search.bilibili.com/all?keyword=" + encodeURIComponent(kw); }

function taskEl(dayIdx, ti, task) {
  const st = dayState(dayIdx);
  const checked = !!st.tasks[ti];
  const [tagTxt, tagCls] = TAGS[task.k];
  const url = task.u || (task.k === "search" ? bilibiliSearchUrl(task.n) : "");
  const el = h(`<div class="task ${checked ? "checked" : ""}">
    <div class="cb" role="checkbox">✓</div>
    <div class="tk">
      <div class="tk-name"><span class="tk-tag ${tagCls}">${tagTxt}</span>${esc(task.n)}</div>
      ${task.note ? `<div class="tk-note">${esc(task.note)}</div>` : ""}
    </div>
    ${url ? `<a class="openbtn ${task.k === "doc" ? "doc" : ""} ${task.k === "search" ? "search" : ""}" href="${url}" target="_blank" rel="noopener">打开</a>` : ""}
  </div>`);
  el.querySelector(".cb").addEventListener("click", () => {
    st.tasks[ti] = !st.tasks[ti]; save(); render(); toast(st.tasks[ti] ? "已完成该任务 ✓" : "已取消");
  });
  return el;
}

function renderToday() {
  const i = viewDay, d = DAYS[i - 1], st = dayState(i);
  const card = h(`<div>
    <div class="weeks">${[1, 2, 3, 4].map(w => `<button class="wbtn ${w === d.w ? "on" : ""}" data-w="${w}"><b>${WEEK_SHORT[w][0]}</b><span>${WEEK_SHORT[w][1]}</span></button>`).join("")}</div>
    <div class="card ${st.done ? "isdone" : ""}">
      <div class="dayhead">
        <span class="daynum">D${i}</span>
        <span class="daytitle">${esc(d.t)}</span>
        <span class="done-badge">已打卡 ✓</span>
        <span class="daydate">${fmtDate(dayDate(i))}</span>
      </div>
      <div class="sec tasks"></div>
      ${d.q && d.q.length ? `<div class="sec"><h3>🗝 自检问题</h3><ul class="check">${d.q.map(q => `<li>${esc(q)}</li>`).join("")}</ul></div>` : ""}
      <div class="sec"><h3>✍️ 今日笔记（自动保存）</h3>
        <textarea placeholder="用自己的话记：概念定义 / 数量级 / 和现有知识的连接点">${esc(st.notes || "")}</textarea>
      </div>
      <button class="bigbtn ${st.done ? "done" : ""}">${st.done ? "✓ 已打卡 · 点击可撤销" : "完成今日打卡"}</button>
      <div style="display:flex;gap:8px">
        <button class="subbtn" id="prevDay" ${i <= 1 ? "disabled" : ""}>← 前一天</button>
        <button class="subbtn" id="todayJump">今天 D${currentDay()}</button>
        <button class="subbtn" id="nextDay" ${i >= 28 ? "disabled" : ""}>后一天 →</button>
      </div>
    </div>
  </div>`);

  const tasksBox = card.querySelector(".tasks");
  d.tasks.forEach((t, ti) => tasksBox.appendChild(taskEl(i, ti, t)));
  card.querySelectorAll(".wbtn").forEach(b => b.addEventListener("click", () => {
    const w = +b.dataset.w;
    if (w !== d.w) { viewDay = (w - 1) * 7 + 1; window.scrollTo(0, 0); }
    render();
  }));
  card.querySelector("textarea").addEventListener("input", e => { st.notes = e.target.value; save(); });
  card.querySelector(".bigbtn").addEventListener("click", () => {
    st.done = !st.done; st.ts = st.done ? Date.now() : 0; save(); render();
    if (st.done) {
      const left = 28 - doneCount();
      toast(left > 0 ? `打卡成功！剩余 ${left} 天 🔥${streak()}` : "🎉 一个月计划完成！");
    }
  });
  card.querySelector("#prevDay").addEventListener("click", () => { if (viewDay > 1) { viewDay--; render(); window.scrollTo(0, 0); } });
  card.querySelector("#nextDay").addEventListener("click", () => { if (viewDay < 28) { viewDay++; render(); window.scrollTo(0, 0); } });
  card.querySelector("#todayJump").addEventListener("click", () => { viewDay = currentDay(); render(); window.scrollTo(0, 0); });
  return card;
}

function renderPlan() {
  const cur = currentDay();
  const el = h(`<div><div class="card">
    <div style="font-weight:800;font-size:17px;margin-bottom:4px">🗓 28天总览</div>
    <div class="muted">点击任意一天查看/补打卡 · 开始日期 ${esc(state.startDate)}</div>
    <div class="plist"></div>
  </div></div>`);
  const list = el.querySelector(".plist");
  DAYS.forEach((d, i2) => {
    const i = i2 + 1;
    const isDone = state.days[i] && state.days[i].done;
    const it = h(`<div class="item ${isDone ? "isdone" : ""}">
      <div class="idx">${isDone ? "✓" : "D" + i}</div>
      <div style="flex:1"><div class="nm">${esc(d.t)}${i === cur ? '<span class="today-mark">今天</span>' : ""}</div>
      <div class="dt">${WEEK_TITLES[d.w]} · ${fmtDate(dayDate(i))}</div></div>
    </div>`);
    it.addEventListener("click", () => { viewDay = i; setTab("today"); });
    list.appendChild(it);
  });
  return el;
}

function renderRes() {
  const el = h(`<div><div class="card">
    <div style="font-weight:800;font-size:17px;margin-bottom:4px">📚 报告与文章</div>
    <div class="muted">点「已读」打卡阅读进度 · PDF 打开后可「分享→存储到文件/图书」便于批注</div>
    <div id="resList"></div>
  </div></div>`);
  const list = el.querySelector("#resList");
  RESOURCES.forEach(r => {
    const isRead = !!state.resources[r.id];
    const it = h(`<div class="res ${isRead ? "isread" : ""}">
      <div class="r1">
        <div class="nm">${esc(r.n)}</div>
        <button class="rd">${isRead ? "已读 ✓" : "未读"}</button>
      </div>
      <div class="ds">${esc(r.d)}</div>
      ${r.u ? `<a class="lnk ${r.kind === "doc" ? "doc" : ""}" href="${r.u}" target="_blank" rel="noopener">${r.kind === "doc" ? "打开 / 下载" : "查看"} ↗</a>` : ""}
    </div>`);
    it.querySelector(".rd").addEventListener("click", () => {
      state.resources[r.id] = !state.resources[r.id]; save(); render();
      toast(state.resources[r.id] ? "标记为已读 ✓" : "已取消");
    });
    list.appendChild(it);
  });
  return el;
}

function renderSet() {
  const el = h(`<div class="card help">
    <div style="font-weight:800;font-size:17px;margin-bottom:6px">⚙️ 设置</div>
    <p><b>开始日期</b>（第1天对应的日期）</p>
    <input type="date" id="startDate" value="${esc(state.startDate)}">
    <button class="subbtn" id="exportBtn">📋 导出备份（复制全部打卡与笔记）</button>
    <textarea id="exportBox" class="hidden" style="margin-top:10px" readonly></textarea>
    <button class="subbtn" id="resetBtn" style="color:#e11d48">清空本机所有打卡数据</button>

    <div style="font-weight:800;font-size:17px;margin:22px 0 6px">📲 装成手机App</div>
    <div class="step">用 iPhone 的 <b>Safari</b> 打开本App网址 → 点底部<b>分享</b>按钮 → 选<b>「添加到主屏幕」</b>。之后从桌面图标进入，就是全屏无浏览器界面的独立App。</div>

    <div style="font-weight:800;font-size:17px;margin:22px 0 6px">⏰ 每晚提醒（推荐）</div>
    <div class="step">iPhone 自带 <b>快捷指令</b> App → 自动化 → 新建<b>个人自动化</b> → <b>特定时间</b>（如每天 20:00）→ 添加操作 <b>「打开URL」</b> 填本App网址 → 关闭「运行前询问」。之后每晚自动弹出学习页面。</div>

    <div style="font-weight:800;font-size:17px;margin:22px 0 6px">ℹ️ 数据说明</div>
    <p>打卡、任务勾选、笔记全部存在<b>本机</b>（localStorage）：不上传服务器，换设备或清空Safari网站数据会丢失。重要笔记请定期用上方「导出备份」复制保存。</p>
    <p>视频链接若失效，按当天任务里的 UP主名 + 标题 在B站重新搜索即可。</p>
  </div>`);
  el.querySelector("#startDate").addEventListener("change", e => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)) { state.startDate = e.target.value; save(); viewDay = currentDay(); render(); toast("开始日期已更新"); }
  });
  el.querySelector("#exportBtn").addEventListener("click", () => {
    const box = el.querySelector("#exportBox");
    box.classList.remove("hidden");
    const lines = ["新能源30天 · 备份 " + new Date().toLocaleString()];
    lines.push("开始日期：" + state.startDate);
    for (let i = 1; i <= 28; i++) {
      const st = state.days[i];
      if (!st || !(st.done || st.notes)) continue;
      lines.push(`\nD${i} ${DAYS[i - 1].t} ${st.done ? "✓" : ""}`);
      if (st.notes) lines.push("笔记：" + st.notes);
    }
    const read = Object.keys(state.resources).filter(k => state.resources[k]);
    if (read.length) lines.push("\n已读资料：" + read.map(k => (RESOURCES.find(r => r.id === k) || {}).n).join("、"));
    box.value = lines.join("\n");
    box.select();
    if (navigator.clipboard) navigator.clipboard.writeText(box.value).then(() => toast("已复制到剪贴板")).catch(() => {});
    else toast("长按文本框全选复制");
  });
  el.querySelector("#resetBtn").addEventListener("click", () => {
    if (confirm("确定清空所有打卡、勾选与笔记？不可恢复。")) {
      localStorage.removeItem(STORE_KEY); state = loadState(); viewDay = currentDay(); render(); toast("已清空");
    }
  });
  return el;
}

function setTab(t) { tab = t; render(); }

function render() {
  const app = $("#app");
  app.innerHTML = "";
  const head = h(`<div class="top">
    <div><div class="t1"><span class="bolt">⚡️</span>新能源30天</div>
    <div class="t2">${esc(WEEK_TITLES[DAYS[viewDay - 1].w])} · D${viewDay}/28</div></div>
    <div class="ring"><div class="p" style="--deg:${Math.round(doneCount() / 28 * 360)}deg"></div>
    <div class="v">${doneCount()}/28</div></div>
  </div>`);
  const stats = h(`<div class="stats">
    <div class="stat fire"><div class="n">🔥 ${streak()}</div><div class="l">连续打卡</div></div>
    <div class="stat"><div class="n">${doneCount()}</div><div class="l">已完成天数</div></div>
    <div class="stat"><div class="n">${Object.keys(state.resources).filter(k => state.resources[k]).length}</div><div class="l">已读资料</div></div>
  </div>`);
  app.appendChild(head);
  if (tab === "today") app.appendChild(stats);
  if (tab === "today") app.appendChild(renderToday());
  else if (tab === "plan") app.appendChild(renderPlan());
  else if (tab === "res") app.appendChild(renderRes());
  else app.appendChild(renderSet());
  document.querySelectorAll("nav button").forEach(b => {
    b.classList.toggle("on", b.dataset.tab === tab);
    b.onclick = () => { tab = b.dataset.tab; window.scrollTo(0, 0); render(); };
  });
}

viewDay = currentDay();
render();

/* iOS Safari 首次访问提示安装；已装(standalone)或已关闭则不显示 */
(function () {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = window.navigator.standalone === true ||
    (typeof window.matchMedia === "function" && window.matchMedia("(display-mode: standalone)").matches);
  if (!isIOS || standalone || sessionStorage.getItem("nev30_tip_closed")) return;
  const tip = document.createElement("div");
  tip.id = "installTip";
  tip.innerHTML = "📲 安装到桌面：点底部工具栏的<b>「分享」</b>按钮 → 选<b>「添加到主屏幕」</b>。以后点图标即可打开，和App一样。<button class=\"x\">✕</button>";
  tip.querySelector(".x").addEventListener("click", () => {
    tip.remove(); sessionStorage.setItem("nev30_tip_closed", "1");
  });
  document.body.appendChild(tip);
})();
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
