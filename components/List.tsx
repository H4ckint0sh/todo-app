import { useEffect, useState } from "react";
import cross from "../images/icon-cross.svg";
import Image from "next/image";
import { Todo } from "../stateMachines/todoMachine";
import clsx from "clsx";

type ListPropTypes = {
	todos: Todo[];
	removeTodo: (id: number) => void;
	completeTodo: (id: number) => void;
	setTodos: (todos: Todo[]) => void;
	filterTodos: (filter: string) => void;
	activeFilter: string;
};

const List = ({
	todos,
	removeTodo,
	completeTodo,
	setTodos,
	filterTodos,
	activeFilter,
}: ListPropTypes) => {
	useEffect(() => {
		console.log(activeFilter);
	}, [activeFilter]);
	return (
		<article className="w-full px-10 my-10 sm:px-0 sm:mx-auto">
			{todos.length !== 0 && (
				<ul className="bg-gray-800 rounded-lg">
					{todos.length &&
						todos.map(({ id, title, completed }) => (
							<ul
								key={id}
								className="list flex items-center justify-between border-b border-gray-700 cursor-pointer py-3 pl-4 pr-4"
							>
								<li className="text-white">
									<div className="flex items-center">
										<label className="inline-flex items-center mr-4">
											<input
												type="checkbox"
												className="form-checkbox h-5 w-5 text-orange-600 rounded-full"
												checked={completed}
												onChange={() =>
													completeTodo(id)
												}
											/>
										</label>
										{title}
									</div>
								</li>
								<button onClick={() => removeTodo(id)}>
									<Image
										src={cross}
										alt="remove"
										className="w-4 font-medium cross"
									/>
								</button>
							</ul>
						))}
					<div className="flex items-center justify-between py-3 px-5 text-gray-400">
						<p className="text-sm">{todos.length} items left</p>
						<ul className="flex">
							<li>
								<button
									className={clsx(
										"text-sm mx-1",
										activeFilter === "all" && "text-white"
									)}
									onClick={() => filterTodos("all")}
								>
									All
								</button>
							</li>
							<li>
								<button
									className={clsx(
										"text-sm mx-1",
										activeFilter === "active" &&
											"text-white"
									)}
									onClick={() => filterTodos("active")}
								>
									Active
								</button>
							</li>
							<li>
								<button
									className={clsx(
										"text-sm mx-1",
										activeFilter === "completed" &&
											"text-white"
									)}
									onClick={() => filterTodos("completed")}
								>
									Completed
								</button>
							</li>
						</ul>
						<div>
							<button
								className="text-sm"
								onClick={() => setTodos(todos)}
							>
								Clear completed
							</button>
						</div>
					</div>
				</ul>
			)}
		</article>
	);
};

export default List;
