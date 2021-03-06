import React from 'react'

export default function Loader() {
    return (
        <div id="preloader">
            <img className="logo" src="/images/logo1.png" alt='' width={119} height={58} />
            <div id="status">
                <span />
                <span />
            </div>
        </div>
    )
}
