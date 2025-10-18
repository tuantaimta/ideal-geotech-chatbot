jQuery(document).ready(function ($) {
    const chatbot = $("#igc-chatbot");
    const body = $("#igc-chatbot .igc-body");
    const backBtn = $("#igc-back");

    // Lưu lịch sử màn hình để xử lý nút back
    const chatHistory = [];

    // === RENDER FUNCTIONS ===
    function renderWelcome() {
        body.html(`
            <p>Hey there 👋 I’m Ideal Assistant, your friendly guide at Ideal Geotech! 💡<br>
            Looking to place an order? I can point you straight to the right service and if you’re not sure, just leave me your details and our team will give you a call.<br>
            Shall we get started? 🚀</p>
            <button class="igc-btn" id="igc-guide">Yes, guide me!</button>
            <button class="igc-btn" id="igc-explore" style="background:#ddd;color:#000;">I’ll explore myself</button>
        `);
        chatHistory.push(renderWelcome);
    }

    function renderServices() {
        body.html(`
            <p>Awesome 😎 Which service do you need help with today?</p>
            <button class="igc-btn" data-service="order-a-site-classification-new">Site / Lot Classification</button>
            <button class="igc-btn" data-service="custom-lot-classification-geotech-reports">Customisable Site / Lot Classification</button>
            <button class="igc-btn" data-service="footing-inspection-order-form">Footing Inspection</button>
            <button class="igc-btn" data-service="order-environmental-custom">Environmental Services</button>
            <button class="igc-btn" data-service="geotechnical-services-new">Geotechnical Services</button>
            <button class="igc-btn" id="igc-not-sure" style="background:#ddd;color:#000;">Not sure 🤔</button>
        `);
        chatHistory.push(renderServices);
    }

    function renderServiceLink(service, label) {
        // Danh sách mô tả chi tiết cho từng service
        const descriptions = {
            "order-a-site-classification-new": `
            Standard testing for residential homes – includes 2 boreholes drilled up to 3m or until rock is reached. 
            Ideal for getting your site ready for construction approvals.
        `,
            "custom-lot-classification-geotech-reports": `
            Need something more detailed? You can customise your report with multiple boreholes and testing up to 6 meters, 
            plus extra tests if required.
        `,
            "footing-inspection-order-form": `
            Order a footing inspection with short lead times – perfect for urgent jobs where you need fast site checks 
            before moving ahead with construction.
        `,
            "order-environmental-custom": `
            We offer a range of environmental tests. Get a tailored quote to meet your project’s specific 
            environmental requirements.
        `,
            "geotechnical-services-new": `
            Looking for more advanced soil or ground testing? Request a quote for one of our specialised 
            geotechnical services.
        `,
        };

        // Lấy mô tả tương ứng với service
        const description = descriptions[service] || "Detailed service information is coming soon.";

        // Render nội dung ra khung chat
        body.html(`
        <div class="igc-service-info">
            <p>${description}</p>
            <p>Great choice ✅ Click below to jump straight to the order form for that service.</p>
            <a class="igc-btn igc-go-link" href="${igc_vars.order_page}/${service}" target="_blank">${label}</a>
        </div>
    `);

        // Lưu vào lịch sử để nút Back hoạt động
        chatHistory.push(() => renderServiceLink(service, label));
    }


    function renderNotSureForm() {
        body.html(`<div id="gf-form-wrap">Loading form...</div>`);
        $.post(igc_vars.ajax_url, { action: 'igc_load_form', form_id: igc_vars.gf_form_id }, function (res) {
            $("#gf-form-wrap").html(res);
        });
        chatHistory.push(renderNotSureForm);
    }

    function renderSupport() {
        body.html(`
            <p>Need more help later? You can always email us at 
            <a href="mailto:${igc_vars.support_email}">${igc_vars.support_email}</a> 📧.<br>
            We’ll be here when you need us! 💙</p>
        `);
        chatHistory.push(renderSupport);
    }

    // === EVENT HANDLERS ===
    $("#igc-toggle").on("click", () => chatbot.toggle());

    // Nút Back (góc trên phải)
    backBtn.on("click", function () {
        if (chatHistory.length > 1) {
            chatHistory.pop();
            const prev = chatHistory.pop();
            if (prev) prev();
        } else {
            chatbot.hide();
        }
    });

    // Flow chính
    renderWelcome();

    // 1️⃣ Bắt đầu hướng dẫn
    body.on("click", "#igc-guide", renderServices);

    // 2️⃣ Tự khám phá → Chuyển sang trang Order
        body.on("click", "#igc-explore", function () {
        renderSupport();
    });
    // 3️⃣ Người dùng chọn service cụ thể
    body.on("click", "[data-service]", function () {
        const service = $(this).data("service");
        const label = $(this).text();
        renderServiceLink(service, label);
    });

    // 4️⃣ Người dùng chọn “Not sure”
    body.on("click", "#igc-not-sure", renderNotSureForm);

    // 5️⃣ Sau khi click vào link dịch vụ → render support
    body.on("click", ".igc-go-link", function () {
        setTimeout(() => renderSupport(), 500);
    });
    
});

jQuery(document).ready(function ($) {
 const tooltip = $('.igc-tooltip');
  const toggleBtn = $('#igc-toggle');

  // Ẩn tooltip khi bấm nút close
  $('.igc-tooltip .igc-close').on('click', function () {
    tooltip.fadeOut(300);
  });

  // Ẩn tooltip khi bấm nút chat toggle
  toggleBtn.on('click', function () {
    tooltip.fadeOut(300);
  });
});
