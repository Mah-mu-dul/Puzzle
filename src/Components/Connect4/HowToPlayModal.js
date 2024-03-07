
const HowToPlayModal = () => {
    return (
        <>
            <div className="m-5 max-w-lg">
                <div tabIndex={0} className="collapse  collapse-arrow border rounded w-full border-base-300 ">
                    <div className="collapse-title text-xl font-medium text-black bg-transparent">
                        How to play Connect 4
                    </div>
                    <div className="collapse-content w-full">


                        <div className="w-full p-6 ">
                            <h1 className="text-3xl font-bold mb-4">How to Play Connect Four</h1>

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Game Setup</h2>
                                <p>1. <span className="font-semibold">Board:</span> The game is played on a grid board with 6 rows and 7 columns, totaling 42 positions.</p>
                                <p>2. <span className="font-semibold">Discs:</span> Each player is assigned a color, traditionally red or yellow, and takes turns dropping their colored discs into the columns of the grid.</p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Gameplay</h2>
                                <p>1. <span className="font-semibold">Starting the Game:</span> Decide who goes first. The player with the yellow discs usually starts.</p>
                                <p>2. <span className="font-semibold">Taking Turns:</span> Players take turns dropping one of their discs into any of the unfilled columns on the board. The disc falls to the lowest available position within the column.</p>
                                <p>3. <span className="font-semibold">Forming Lines:</span> The objective is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs. The line can be formed either horizontally, vertically, or diagonally.</p>
                                <p>4. <span className="font-semibold">Blocking Opponent:</span> Players also try to block their opponent from forming a line of four.</p>
                                <p>5. <span className="font-semibold">Winning the Game:</span> The game ends when one player successfully forms a line of four of their own colored discs. The game also ends in a draw if the entire board is filled without either player forming a line of four.</p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Example Gameplay</h2>
                                <p>1. Player 1 (Yellow) places their first disc in a column of their choice.</p>
                                <p>2. Player 2 (Red) places their first disc in a different column.</p>
                                <p>3. Players continue taking turns until one player successfully forms a line of four of their own colored discs or until the board is full.</p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Additional Rules</h2>
                                <p>1. <span className="font-semibold">Blocking and Strategy:</span> Players can use strategy to not only form their own lines but also to block their opponent from forming lines.</p>
                                <p>2. <span className="font-semibold">Winning Lines:</span> A line of four discs must be uninterrupted by gaps to count as a win. However, diagonal lines can have gaps in the middle.</p>
                                <p>3. <span className="font-semibold">Multiple Wins:</span> It's possible for both players to form a line of four at the same time, resulting in a draw.</p>
                                <p>4. <span className="font-semibold">Friendly Games:</span> Connect Four is often played casually, but tournaments and competitive matches can also be organized with more formal rules and regulations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HowToPlayModal;