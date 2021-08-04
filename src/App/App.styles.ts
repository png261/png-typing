import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100vh;
	main {
		width: 90.7rem;
		height: 34.4rem;
		padding: 0.2rem;
		overflow: hidden;
		position: relative;
		top: 40%;
		background-color: #000;
		box-shadow: rgba(0, 0, 0, 0.3) 0.4rem 0.4rem 0 0;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 0.5rem;
		display: grid;
		grid-gap: 0.2rem;
		grid-template-areas:
			'langues result result result result result typing typing typing notice'
			'langues result result result result result typing typing typing notice'
			'langues result result result result result typing typing typing typing-effect'
			'sentences pangram pangram speed speed accuracy accuracy count count typing-effect'
			'sentences goal goal speed speed accuracy accuracy count count typing-effect'
			'sentences goal goal author author author author author author typing-effect'
			'typing-area typing-area typing-area typing-area typing-area typing-area typing-area typing-area typing-area typing-area';
		grid-template-columns: 14rem repeat(8, 1fr) 32.3rem;
		grid-template-rows: repeat(3, 2.5rem) 2.8rem 1.7rem 2.8rem 1fr;
		.typing-area {
			grid-area: typing-area;
		}
		.languages-options {
			grid-area: langues;
		}
		.sentences-options {
			grid-area: sentences;
		}
		.pangram {
			grid-area: pangram;
		}
		.goal-results {
			grid-area: result;
			font-size: 1rem;
		}
		.typing-options {
			grid-area: typing;
		}
		.notice {
			grid-area: notice;
			font-size: 1rem;
		}
		.typing-effect {
			grid-area: typing-effect;
		}
		.goal-speed {
			grid-area: goal;
			grid-column: span 1.5;
		}
		.speed {
			grid-area: speed;
		}
		.accuracy {
			grid-area: accuracy;
		}
		.count {
			grid-area: count;
		}
		.author {
			grid-area: author;
			font-size: 1rem;
		}
		& > * {
			background-color: var(--boxbg);
			border-radius: 0.3rem;
		}
	}
	@media (max-width: 1024px) {
		main {
			width: 58.1rem;
			grid-template-areas:
				'langues result result result result typing typing typing'
				'langues result result result result typing typing typing'
				'langues result result result result typing typing typing'
				'sentences goal speed speed accuracy accuracy count count'
				'sentences goal speed speed accuracy accuracy count count'
				'sentences goal author author author author author author'
				'typing-area typing-area typing-area typing-area typing-area typing-area typing-area typing-area typing-area';
			grid-template-columns: 14rem 11rem repeat(6, 1fr);
			.notice,
			.typing-effect {
				display: none;
			}
		}
	}
`;

export const Notice = styled.div`
	padding: 0.7rem 1rem;
	display: flex;
	flex-direction: column;
	row-gap: 0.9rem;
	& > *:not(p) {
		text-align: right;
		font-size: 1.2rem;
	}
`;
