const TYPING_MODE_OPTIONS = {
    times: [5, 10, 15, 20, '∞'],
    minute: [
        ...[...new Array(10).keys()].map(
            (t) => `${String(t + 1).padStart(2, '0')}:00`
        ),
        '∞',
    ],
};
export default TYPING_MODE_OPTIONS;
