function Footer() {
    return `
    <footer class="footer">
      <div class="footer-content">

        <div class="footer-copy">
          © 2026 Netflix Clone
        </div>

      </div>
    </footer>
  `
}


let footerStyleLoaded = false

function injectFooterStyles() {
    if (footerStyleLoaded) return

    const style = document.createElement("style")

    style.innerHTML = `
        .footer {
            margin-top: 50px;
            padding: 30px 20px;
            background: #111;
            color: #aaa;
            font-size: 16px;
        }

        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1000px;
            margin: 0 auto;
        }


        /* Responsividade */

        @media (max-width: 768px) {
            .footer-content {
                flex-direction: column;
                align-items: center;
                gap: 20px;
                text-align: center;
            }

            .footer {
                font-size: 14px;
            }
        }
            

        @media (max-width: 480px) {
            .footer {
                padding: 20px 15px;
            }

            .footer-content {
                gap: 15px;
            }

            .footer-copy {
                font-size: 12px;
                color: #777;
            }
        }
    `

    document.head.appendChild(style)
    footerStyleLoaded = true
}


function loadFooter() {
    injectFooterStyles()

    const container = document.getElementById("footer")
    container.innerHTML = Footer()
}
