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
	const [selctedFilter, setSelectedFilter] = useState("all");

	useEffect(() => {
		filterTodos(selctedFilter);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selctedFilter]);

	return (
		<article className="w-full px-10 my-10 sm:px-0 sm:mx-auto bg-gray-800 rounded-lg">
			<div className="flex items-center justify-between py-3 px-5 text-gray-400 border-b border-gray-700">
				<span className="w-1/3 text-sm">{todos.length} items left</span>

				<select
					id="select"
					value={selctedFilter}
					onChange={(e) => setSelectedFilter(e.target.value)}
					className="w-1/3 border bg-white text-gray-700 rounded px-1 py-1
					 outline-none select"
				>
					<option className="py-1" value="all">
						All
					</option>
					<option className="py-1" value="active">
						Active
					</option>
					<option className="py-1" value="completed">
						Completed
					</option>
				</select>
				<button
					className="w-1/3 text-sm text-right"
					onClick={() => setTodos(todos)}
				>
					Clear completed
				</button>
			</div>

			{todos.length &&
				todos.map(({ id, title, completed }) => (
					<ul
						key={id}
						className="list bg-gray-800 rounded-lg flex items-center justify-between border-b border-gray-700 cursor-pointer py-3 pl-4 pr-4"
					>
						<li className="text-white">
							<div className="flex items-center">
								<label className="inline-flex items-center mr-4">
									<input
										type="checkbox"
										className="form-checkbox h-5 w-5 text-orange-600 rounded-full"
										checked={completed}
										onChange={() => completeTodo(id)}
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
		</article>
	);
};

export default List;
