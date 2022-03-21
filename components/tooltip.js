export default /*inline-css*/`
    .tooltip:not(.splash-close-button) {
        position: relative;
    }

    .tooltip:hover::before {
        content: attr(data-tip);
        position: absolute;
        padding: 6px;
        background: #18191c;
        display: block;
        border-radius: 4px;
        font-size: 12px;
        white-space: pre;
    }

    .tooltip:hover::after {
        content: "";
        background: #18191c;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
        display: block;
        position: absolute;
    }

    .tooltip:hover::after, .tooltip:hover::before {
        animation: TooltipOpen .1s ease-in;
    }

    .tooltip.tooltipBottom::before {
        top: 20px;
        right: 5px;
    }

    .tooltip.pointerRight::after {
        right: 10px;
        top: 16px;
    }

    .tooltip.pointerLeft::after {
        top: -46%;
        right: 10px; 
    }

    .tooltip.tooltipTop::before {
        top: -150%;
    }

    @keyframes TooltipOpen {
        from {
            transform: scale(0.7);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;