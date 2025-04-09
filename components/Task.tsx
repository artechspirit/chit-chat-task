import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { ITags, ITask } from "@/types";
import DatePicker from "./DatePicker";
import EditableText from "./EditableText";
import EditableInput from "./EditableTitle";
import InfoCard from "./Tags";

const TASKDATA: ITask[] = [
  {
    id: 1,
    showDelete: false,
    isNew: false,
    title: "Close off Case #012920- RODRIGUES, Amiguel",
    dueDate: "12/06/2021",
    daysLeft: "2 Days Left",
    isCompleted: false,
    description:
      "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
  },
  {
    id: 2,
    showDelete: false,
    isNew: false,
    title:
      "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
    dueDate: "14/06/2021",
    daysLeft: "4 Days Left",
    isCompleted: false,
    description:
      "All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.",
  },
];

const TAGS: ITags[] = [
  { label: "Important ASAP", variant: "primary" as const, isSelected: true },
  {
    label: "Offline Meeting",
    variant: "secondary" as const,
    isSelected: true,
  },
  {
    label: "Virtual Meeting",
    variant: "tertiary" as const,
    isSelected: false,
  },
  { label: "ASAP", variant: "quaternary" as const, isSelected: false },
  { label: "Client Related", variant: "quinary" as const, isSelected: false },
  { label: "Self Task", variant: "senary" as const, isSelected: false },
  { label: "Appointments", variant: "septenary" as const, isSelected: false },
  { label: "Court Related", variant: "octonary" as const, isSelected: false },
];

export default function Task() {
  const [tasks, setTasks] = useState<ITask[]>(TASKDATA);
  const [tags, setTags] = useState<ITags[]>(TAGS);

  const handleNewTask = () => {
    const newTask: ITask = {
      id: tasks.length + 1,
      showDelete: false,
      isNew: true,
      title: "",
      dueDate: "",
      daysLeft: "",
      isCompleted: false,
      description: "",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id: number, updatedFields: Partial<ITask>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const updateTags = (label: string, updatedFields: Partial<ITags>) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.label === label ? { ...tag, ...updatedFields } : tag
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task">
      {/* Header */}
      <div className="task-header mb-5 flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-[#4F4F4F] left-[62px] relative cursor-pointer border border-[#4f4f4f] p-2 px-3 rounded-sm focus:border-[#4f4f4f]">
            My Tasks
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-none left-[32px] top-[2px] border-[#828282] rounded-[4px] w-[288px] text-[#4F4F4F] ">
            <DropdownMenuItem className="cursor-pointer focus:bg-white focus:text-[#4f4f4f]">
              Personal Errands
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-[#828282] " />
            <DropdownMenuItem className="cursor-pointer focus:bg-white focus:text-[#4f4f4f]">
              Urgent To-Do
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={handleNewTask}
          className="bg-[#2F80ED] hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer min-h-[40px]"
        >
          New Task
        </Button>
      </div>

      {/* Task List */}
      <div className="task-list h-[450px] overflow-y-auto overflow-x-hidden">
        {tasks.map(
          ({
            id,
            title,
            description,
            dueDate,
            daysLeft,
            isCompleted,
            showDelete,
            isNew,
          }) => (
            <div
              key={id}
              className="relative task-item py-4 flex border-b-2 border-b-[#828282]"
            >
              <Checkbox
                checked={isCompleted}
                onChange={() => updateTask(id, { isCompleted: !isCompleted })}
                className="group cursor-pointer size-5 rounded bg-white/10 p-1 ring-2 ring-[#828282] ring-inset data-[checked]:bg-white"
              >
                <CheckIcon className="hidden size-5 mt-[-4px] ml-[-4px] fill-[#828282] group-data-[checked]:block" />
              </Checkbox>

              <Accordion
                type="single"
                collapsible
                style={{ width: "calc(100% - 20px)" }}
              >
                <AccordionItem value={`item-${id}`}>
                  <div className="flex items-start justify-between pt-0 hover:no-underline">
                    {isNew && title === "" ? (
                      <EditableInput
                        name="taskTitle"
                        defaultValue="Type task title"
                        onEnter={(title) => updateTask(id, { title })}
                      />
                    ) : (
                      <p
                        className={`pl-4 w-[60%] ${
                          isCompleted && "line-through line-through-[#828282]"
                        } task-title font-bold mt-[-4px] ${
                          isCompleted ? "text-[#828282]" : "text-[#4F4F4F]"
                        }`}
                      >
                        {title}
                      </p>
                    )}

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccordionTrigger className="relative acc-trigger right-menu flex justify-end items-start w-[40%] pt-0 hover:decoration-0 cursor-pointer">
                            {!isCompleted && (
                              <p className="text-[#EB5757] mr-5">{daysLeft}</p>
                            )}
                            <p className="text-[#4F4F4F]">{dueDate}</p>
                            <Image
                              onClick={() =>
                                updateTask(id, { showDelete: true })
                              }
                              className="absolute cursor-pointer right-0 top-0"
                              src="/icons/icon-more.svg"
                              width={20}
                              height={20}
                              alt="More"
                            />
                          </AccordionTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click arrow button to expand</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <AccordionContent className="pt-4">
                    {showDelete && (
                      <Button
                        onClick={() => deleteTask(id)}
                        className={`absolute w-[126px] hover:bg-white text-left right-0 ${
                          title.length > 42 ? "top-[75px]" : "top-[60px]"
                        } bg-white rounded-[4px] h-[43px] border border-[#828282] text-[#EB5757] cursor-pointer`}
                      >
                        Delete
                      </Button>
                    )}

                    {/* Date Picker */}
                    <DatePicker
                      dateProps={dueDate}
                      onSelectDate={(newDate) =>
                        updateTask(id, { dueDate: newDate })
                      }
                    />

                    {/* {Description} */}
                    <EditableText
                      text={description}
                      onSave={(newDescription) =>
                        updateTask(id, { description: newDescription })
                      }
                    />
                    {/* Tags */}
                    <InfoCard
                      tags={tags}
                      onSelectedTags={(tag: ITags) =>
                        updateTags(tag.label, { isSelected: !tag.isSelected })
                      }
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )
        )}
      </div>
    </div>
  );
}
