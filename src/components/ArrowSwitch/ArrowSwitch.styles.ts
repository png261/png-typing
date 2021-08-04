import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	width: 100%;
`;
export const Value = styled.p`
	font-size: 1.8rem;
	line-height: 1;
	${({ currentOption }) =>
		currentOption === '∞' &&
		`font-size: 3rem;letter-spacing:-0.7px;line-height:0.6`}
`;

const Button = `
    position: relative;
    background:inherit;
    border:0;
    width:50%;    
    cursor:pointer;
    &:before {
        content: '';
        top: 50%;
        position: absolute;
        transform: translateY(-50%);
        border: 0.4rem solid rgba(0, 0, 0, 0);
    }
`;
export const PrevButton = styled.button`
	${Button}

	&:before {
		right: 50%;
		border-right: var(--arrow);
	}
`;
export const NextButton = styled.button`
	${Button}

	&:before {
		left: 50%;
		border-left: var(--arrow);
	}
`;
