# Synapse

This is an alpha stage neural network system aiming to make machine learning accessible to developers in a more inuitive way than that seen in similar libraries - without the developer needing to know advanced neural networking mechanics, only what they want to accomplish and a few basics about neural networking fundamentals. 

Additionally Synpase will soon feature GPU accelerated processing support. That, along side its multi threaded design, will make the system a powerful competitor in the market of JS based machine learning solutions. 

In order to use Synapse, unlike in similar libraries where the developer requires a deep understanding of neural network mechanics and must choose their own network design, Synapse allows the developer to simply call up a new instance of Synapse, tie the inputs and outputs into a test environment of their own design, and everything else will happen under the hood without any work on their part. 

The GPU accelerated, multi threaded evolutionary process that goes on behind the scenes will rapidly search for the optimal design to accomplish the task at hand - the developer will only need to understand the most basic neural networking concepts to utilize Synapse:

- A system can't figure out how to solve a problem if it doesn't have all the necessary information to do so, so it's important to consider what information is really needed to accomplish the task, and how that information can be clearly represented as decimals between 0 and 1. 
- The more complex the task, the longer it takes to train a network, with a task that's too hard to accomplish in one step requiring potentially infinite time to learn.
- Therefore more complex tasks should be broken into sub tasks, each with its own instance of Synapse solving one piece of the puzzle at a time before passing their solution to the next instance. 

And that's essentially all there is to it. Much of what's described here already works, but the GPU acceleration and easy to use developer interface are still on the list of things to do along with general polishing. 

# Known Issues 

In the current build, the UI designed to display the real time neural activity of the system is broken after multi threading was introduced. Currently working on a solution. 


