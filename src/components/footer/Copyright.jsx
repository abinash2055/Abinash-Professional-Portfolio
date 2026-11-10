import React from 'react'
import copyRight from "../../data/footer/CopyRight";


const CopyRight = () => {
    return (
        <p>
            © {copyRight.year} {copyRight.name}. {copyRight.rights}
        </p>
    )
}

export default CopyRight