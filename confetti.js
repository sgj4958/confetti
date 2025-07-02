const 폭죽 = (elementQuery, option) => {
    option = {
        message: "Confetti",
        수량: 50,
        크기: [1, 7],
        거리: [30, 80],
        각도: [-10, 80],
        x위치: 10,
        y위치: 70,
        지속시간: 1.5,
        ...option
    }

    const 랜덤 = (...값) => Math.random() * (Math.max(...값) - Math.min(...값)) + Math.min(...값)
    const parent = document.querySelector(elementQuery)
    parent.insertAdjacentHTML("beforeend", `
        <div id="confetti" style="position: relative;min-width: 100px;height: 40px;border: 1px solid #ddd;background: #fff;border-radius: 5px;cursor: pointer;">
            <button style="height: 100%;border: none;background: none;display: flex;justify-content: center;align-items: center;padding: 0 10px;gap: 10px;">
                <p style="transform-origin: 0 100%;">🎉</p>
                <p>${option.message}</p>
            </button>
            <svg viewBox="0 0 100 100" style="position: absolute;bottom: 0;left: 0;"></svg>
        </div>
    `)

    const 펑 = e => {
        const 타겟 = e.currentTarget
        if(타겟.querySelector("svg").childElementCount) return

        타겟.querySelector("button p:nth-child(1)").style.transform = "skew(7deg, 7deg)"
        setTimeout(() => 타겟.querySelector("button p:nth-child(1)").style.transform = "none", 100)

        for(let i = 0; i < option.수량; i++) {
            const 색종이크기 = 랜덤(...option.크기)
            타겟.querySelector("svg").insertAdjacentHTML("beforeend", `<path 
                d="M ${option.x위치} ${option.y위치} v ${색종이크기} h ${색종이크기} v -${색종이크기} z" 
                style="
                    fill: hsl(${Math.round(Math.random() * 360)} 98% 82% / 1);
                    transform-origin: ${option.x위치}px ${option.y위치}px;
                    transition: translate ${option.지속시간}s cubic-bezier(0, 0.8, 0.5, 1), opacity ${랜덤(0.7, 0.1)
                        }s cubic-bezier(0.8, 0, 1, 0.5) ${option.지속시간 / 2}s, rotate ${option.지속시간}s ease-out;
            ">`)
        }

        타겟.querySelectorAll("path").forEach(e => {
            const 현재거리 = 랜덤(...option.거리)
            const 현재각도 = 360 - 랜덤(...option.각도)
            setTimeout(() => {
                e.style.opacity = 0
                e.style.translate = `${
                    현재거리 * Math.cos(Math.PI / 180 * 현재각도)
                }px ${
                    현재거리 * Math.sin(Math.PI / 180 * 현재각도)
                }px`
                e.style.rotate = "90deg"
            })
            e.addEventListener("transitionend", e.remove)
        })
    }

    parent.querySelector("#confetti").addEventListener("click", 펑)
}
