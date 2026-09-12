import type {ReactNode} from "react";
import styles from "./TaskInstruction.module.css";

export function TaskInstruction({children}:{children:ReactNode}){
 return <p className={styles.instruction} data-task-instruction>{children}</p>;
}
