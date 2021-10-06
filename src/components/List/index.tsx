import { Quantity } from "../Quantity";
import { FC, useState } from "react";
import { iList } from "../../types";

type Props = {
	list: iList[];
	animate: null | number;
	toggle: (id: iList["id"]) => void;
	remove: (id: iList["id"]) => void;
	edit: (id: iList["id"], quantity: iList["quantity"]) => void;
	endAnimation: () => void;
};

export const List: FC<Props> = ({
	list,
	animate,
	endAnimation,
	toggle,
	remove,
	edit,
}) => {
	const [del, setDel] = useState<null | number>(null);

	return (
		<section>
			<h2>List</h2>
			{list.length ? (
				<ul>
					{list?.map((list, index) => {
						const { id, product, quantity, completed } = list;
						return (
							<li
								data-n={`# ${index + 1}`}
								key={id}
								onAnimationEnd={endAnimation}
								className={`${animate === id && "animate"}`}
							>
								<div className={`delete ${del === id && "active"}`}>
									<span>Are you sure?</span>
									<button
                    title="Remove the product from the list"
										onClick={() => {
											setDel(null);
											remove(id);
										}}
										className="yes"
									>
										✅ yes
									</button>
									<button title="Cancel" onClick={() => setDel(null)} className="no">
                  ❌ no
									</button>
								</div>
								<span>{product}</span>
								<div>
									<Quantity id={id} edit={edit} qty={quantity} />
									<button
                    title={`${completed === null ? "Mark the product as purchased" : "Unmark the product"}`}
										onClick={() => toggle(id)}
										className={`complete ${
											completed !== null ? "completed" : "incomplete"
										}`}
									>
										✓
									</button>
									<button title="Remove the product from the list" onClick={() => setDel(id)} className="remove">
										🗑
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			) : (
				<p>There are no products.</p>
			)}
		</section>
	);
};
