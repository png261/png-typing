import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem 2rem;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar {
		width: 0; /* Remove scrollbar space */
		background: transparent; /* Optional: just make scrollbar invisible */
	}
`;
export const Result = styled.div`
	display: flex;
	height: 1.5rem;
	text-transform: uppercase;
	justify-content: space-between;
	margin-top: 0.2rem;
	span {
		display: inline-block;
		width: 2.5rem;

		&:nth-child(1) {
			width: 1.5rem;
		}
		&:nth-child(2) {
			margin: 0 1rem 0 0;
			border-right: 0.1rem solid;
		}
		&:nth-child(3) {
			margin: 0 1rem 0 0;
			border-right: 0.1rem solid;
		}
	}
`;
