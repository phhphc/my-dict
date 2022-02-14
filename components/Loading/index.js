import style from "./style.module.css"

function Loading() {
    return (
        <div>
            <div className={style.holder}>
                <div className={style.preloader}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Loading