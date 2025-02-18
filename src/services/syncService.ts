import axios from "axios";
import { getTasksFromDB, saveTaskToDB } from "../utils/localDB";

export const syncTasksWithServer = async () => {
    if (!navigator.onLine) return;

    const token = localStorage.getItem("token");
    const tasks = await getTasksFromDB();
    const unsyncedTasks = tasks.filter(task => !task.synced);

    for (const task of unsyncedTasks) {
        try {
            const response = await axios.post("http://localhost:5000/api/tasks", task, {
                headers: { Authorization: token },
            });

            task.synced = true;
            task.id = response.data.id;
            await saveTaskToDB(task);
        } catch (error) {
            console.error("❌ Error al sincronizar tarea:", task, error);
        }
    }
};
