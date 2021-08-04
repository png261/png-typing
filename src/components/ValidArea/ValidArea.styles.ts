import styled from 'styled-components';

export const Wrapper = styled.div``;
export const Char = styled.span`
	position: relative;
	div {
		width: 0.5rem;
		letter-spacing: -0.7rem;
		height: 0.5rem;
		border-radius: 50%;
		background-color: var(--wrong);
		position: absolute;
		top: -1rem;
		left: 50%;
		transform: translateX(-50%);
	}
`;
