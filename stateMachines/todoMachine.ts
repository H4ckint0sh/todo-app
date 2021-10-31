import { createMachine, assign } from "xstate";

export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

const todoMachine = createMachine<
	{ todos: Todo[]; filteredTodos: Todo[]; aciveFilter: string },
	| { type: "FILTERING" }
	| { type: "EDITING" }
	| { type: "ADD"; title: string }
	| { type: "SET"; todos: Todo[] }
	| { type: "REMOVE"; id: number }
	| { type: "COMPLETE"; id: number }
	| { type: "FILTER"; filter: string }
>({
	id: "todoMachine",
	initial: "editing",
	context: {
		todos: [],
		filteredTodos: [],
		aciveFilter: "",
	},
	states: {
		editing: {
			on: {
				SET: {
					actions: assign({
						todos: (_, { todos }) => todos,
					}),
				},
				ADD: {
					actions: assign({
						todos: ({ todos }, { title }) => [
							...todos,
							{
								id: todos.length,
								title,
								completed: false,
							},
						],
					}),
				},
				REMOVE: {
					actions: assign({
						todos: ({ todos }, { id: removeId }) =>
							todos.filter(({ id }) => id !== removeId),
					}),
				},
				COMPLETE: {
					actions: assign({
						todos: ({ todos }, { id: completeId }) => {
							const newTodos = [...todos];
							const tododToBeCompleted = newTodos.find(
								({ id }) => id === completeId
							);
							if (tododToBeCompleted) {
								const completed = tododToBeCompleted.completed;
								tododToBeCompleted.completed = !completed;
							}
							return newTodos;
						},
					}),
				},
				FILTERING: {
					target: "filtering",
				},
			},
		},
		filtering: {
			on: {
				EDITING: {
					target: "editing",
				},
				FILTER: {
					actions: assign({
						filteredTodos: ({ todos }, { filter }) => {
							const toBeFiltered = [...todos];
							if (filter === "completed") {
								return toBeFiltered.filter(
									({ completed }) => completed === true
								);
							} else if (filter === "active") {
								return toBeFiltered.filter(
									({ completed }) => completed === false
								);
							} else {
								return toBeFiltered;
							}
						},
						aciveFilter: (_, { filter }) => filter,
					}),
				},
			},
		},
		working: {},
	},
});

export default todoMachine;
