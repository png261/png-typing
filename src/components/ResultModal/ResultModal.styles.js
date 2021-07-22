import styled from 'styled-components';
import FinalResultForm from 'src/assets/images/FinalResultForm.svg';

export const ResultBox = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 493px;
    z-index: 99;
    #tws-result {
        position: absolute;
        border-radius: 0.3rem;
        opacity: 0;
        transition: all 0.5s;
        background: no-repeat url(${FinalResultForm});
        background-size: contain;
        #siteName {
            top: 2rem;
            font-size: 30px;
            font-weight: bold;
            text-align: left;
            font-style: normal;
        }
    }
    .tws-result-on {
        width: 320px;
        height: 493px;
        opacity: 1 !important;
        background: #febf01;
    }
    .tws-result-off {
        width: 0px;
        height: 0px;
        opacity: 0 !important;
        background: rgba(0, 0, 0, 0);
    }
    #tws-result > div {
        position: absolute;
        width: 100%;
        font-style: italic;
        text-align: right;
        padding: 0 3rem;
        color: #282828;
    }
    #rstDate {
        top: 9.7rem;
        padding: 0 2.7rem !important;
        font-size: 1.4rem;
    }
    #rstOS {
        top: 12.7rem;
        font-size: 2.4rem;
    }
    #rstMode {
        top: 19rem;
        font-size: 1.4rem;
    }
    #rstMaxSpd {
        top: 21.5rem;
        font-size: 3rem;
    }
    #rstAvgSpd {
        top: 26.2rem;
        font-size: 3rem;
    }
    #rstAvgAcc {
        top: 30.7rem;
        font-size: 3rem;
    }
    #rstStemp {
        top: 32.7rem;
        width: 100%;
        height: 11.2rem;
        background-size: contain;
        background-repeat: no-repeat;
    }
    #rstDay {
        position: absolute;
        font-family: 'Fjalla One', sans-serif;
        font-weight: normal;
        color: #4f0b99;
    }
    #rstDownImg {
        display: block;
        position: absolute;
        bottom: 2.4rem;
        right: 2.4rem;
        width: 5.2rem !important;
        height: 5.2rem;
        background-image: url(../img/result/rstdown.svg);
        background-size: contain;
        background-repeat: no-repeat;
        z-index: 100;
    }
`;
