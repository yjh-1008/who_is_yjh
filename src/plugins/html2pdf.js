import html2pdf from "html2pdf.js"; //html2pdf 라이브러리 import
const methods = {
  // location은 pdf영역 tag
  // fileName은 PDF 파일 명
  htmlToPdf: (location, fileName) => {
    html2pdf()
      .set({
        margin: [15, 0, 15, 0],
        // filename에서 IE11은 .pdf를 자동으로 넣어주지 않아 .pdf를 파일 명에 넣어줘야 한다.
        filename:
          navigator.userAgent.indexOf("MSIE") !== -1 ||
          navigator.appVersion.indexOf("Trident/") > -1
            ? `${fileName}.pdf`
            : fileName,
        pagebreak: { mode: "avoid-all" },
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          useCORS: true,
          scrollY: 0,
          scale: 1,
          dpi: 300,
          letterRendering: true,
          allowTaint: false, //useCORS를 true로 설정 시 반드시 allowTaint를 false처리 해주어야함
        },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      })
      .from(location)
      .save();
  },
};

export default {
  install(Vue) {
    Vue.prototype.$htmlToPdf = methods.htmlToPdf;
  },
};
