jQuery(document).ready(function($) {

    const chatbot = $("#igc-chatbot");
    const body = $("#igc-chatbot .igc-body");
    const toggle = $("#igc-toggle");
    const closeBtn = $("#igc-close");

    // ==== 1️⃣ Render các màn hình ====
    function renderWelcome() {
        body.html(`
            <p>Hey there 👋 I’m Jamie, your friendly guide at Ideal Geotech! 💡<br>
            Looking to place an order? I can point you straight to the right service and if you’re not sure, just leave me your details and our team will give you a call.<br>
            Shall we get started? 🚀</p>
            <button class="igc-btn" id="igc-guide">Yes, guide me!</button>
            <button class="igc-btn" id="igc-explore" style="background:#ddd;color:#000;">I’ll explore myself</button>
        `);
    }

    function renderServices() {
        body.html(`
            <p>Awesome 😎 Which service do you need help with today?</p>
            <button class="igc-btn" data-service="site">Site / Lot Classification</button>
            <button class="igc-btn" data-service="custom">Customisable Site / Lot Classification</button>
            <button class="igc-btn" data-service="footing">Footing Inspection</button>
            <button class="igc-btn" data-service="env">Environmental Services</button>
            <button class="igc-btn" data-service="geo">Geotechnical Services</button>
            <button class="igc-btn" id="igc-not-sure" style="background:#ddd;color:#000;">Not sure 🤔</button>
        `);
    }

    function renderServiceLink(service) {
        body.html(`
            <p>Great choice ✅ Click below to jump straight to the order form for that service.</p>
            <a class="igc-btn" href="${igc_vars.order_page}#${service}" target="_blank">Go to ${service}</a>
        `);
    }

    function renderNotSureForm() {
        body.html(`<div id="gf-form-wrap">Loading form...</div>`);
        $.post(igc_vars.ajax_url, { action: 'igc_load_form', form_id: igc_vars.gf_form_id }, function(res) {
            $("#gf-form-wrap").html(res);
        });
    }

    function renderSupport() {
        body.html(`
            <p>Need more help later? You can always email us at 
                <a href="mailto:${igc_vars.support_email}">${igc_vars.support_email}</a> 📧.<br>
                We’ll be here when you need us! 💙
            </p>
        `);

        chatbot.attr("data-mode", "support");

        // Tự động đóng popup sau 3s nếu user không bấm gì
        const autoClose = setTimeout(() => {
            if (chatbot.attr("data-mode") === "support") closeChatPopup();
        }, 3000);

        // Nếu user click close lần nữa => đóng ngay
        closeBtn.off("click").on("click", function() {
            clearTimeout(autoClose);
            closeChatPopup();
        });
    }

    // ==== 2️⃣ Hành vi toggle chat ====
    function closeChatPopup() {
        chatbot.hide();
        toggle.show();
        chatbot.removeAttr("data-mode");
    }

    toggle.on("click", function() {
        chatbot.toggle();
        toggle.toggle();
    });

    // ==== 3️⃣ Sự kiện Close ====
    closeBtn.on("click", renderSupport);

    // ==== 4️⃣ Các sự kiện điều hướng ====
    body.on("click", "#igc-guide", renderServices);

    body.on("click", "#igc-explore", function() {
        window.location.href = igc_vars.order_page;
    });

    body.on("click", "[data-service]", function() {
        let service = $(this).data("service");
        renderServiceLink(service);
    });

    body.on("click", "#igc-not-sure", renderNotSureForm);

    // ==== 5️⃣ Khởi động ====
    renderWelcome();
});
