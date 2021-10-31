import { useState, useMemo, useEffect } from "react";
import type { NextPage } from "next";
import List from "../components/List";
import Logo from "../components/Logo";
import { BsCircle } from "react-icons/bs";
import { useMachine } from "@xstate/react";
import todoMachine, { Todo } from "../stateMachines/todoMachine";

const Home: NextPage = () => {
	const [text, setText] = useState("");
	const [current, send] = useMachine(todoMachine);

	useEffect(() => {
		setText(text);
	}, [text]);

	const toDos = useMemo(() => {
		current.context.todos;
	}, [current.context.todos]);

	const submit = (e: React.FormEvent<EventTarget>): void => {
		e.preventDefault();
		send({ type: "EDITING" });
		send({
			type: "ADD",
			title: text,
		});
		setText("");
	};

	const removeTodo = (id: number): void => {
		send({ type: "EDITING" });
		send({
			type: "REMOVE",
			id,
		});
	};

	const completeTodo = (id: number): void => {
		send({ type: "EDITING" });
		send({
			type: "COMPLETE",
			id,
		});
	};

	const filterTodos = (filter: string): void => {
		send({ type: "FILTERING" });
		send({
			type: "FILTER",
			filter,
		});
	};

	const setTodos = (todos: Todo[]): void => {
		send({
			type: "SET",
			todos,
		});
	};

	return (
		<main className="w-full sm:max-w-lg mx-auto">
			<Logo />
			<form
				className="flex w-full items-center justify-center mt-10"
				onSubmit={(e) => submit(e)}
			>
				<div className="relative w-full mx-auto flex items-center">
					<BsCircle className="text-gray-400 absolute left-3" />
					<input
						type="text"
						name="text"
						id="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Create a new todo"
						className="w-full rounded-lg text-gray-400 bg-gray-700 py-2 pl-10 pr-5"
					/>
				</div>
			</form>

			<List
				todos={
					current.matches("editing")
						? current.context.todos
						: current.matches("filtering")
						? current.context.filteredTodos
						: []
				}
				activeFilter={current.context.aciveFilter}
				removeTodo={removeTodo}
				setTodos={setTodos}
				completeTodo={completeTodo}
				filterTodos={filterTodos}
			/>
		</main>
	);
};

export default Home;
