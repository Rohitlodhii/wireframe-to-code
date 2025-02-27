

const Model = [
    { name: "geminipro", id: "google/gemini-2.0-pro-exp-02-05:free", title: "Gemini 2 Pro" },
    { name: "geminiflash", id: "google/gemini-2.0-flash-exp:free", title: "Gemini 2 Flash" },
    { name: "deepr1", id: "deepseek/deepseek-r1:free", title: "DeepSeek R1" },
    { name: "deepv3", id: "deepseek/deepseek-chat:free", title: "DeepSeek V3" },
    { name: "meta", id: "meta-llama/llama-3.3-70b-instruct:free", title: "Meta Llama 3.3" },
    { name: "qwen", id: "qwen/qwen-vl-plus:free", title: "Qwen VL Plus" },
];


export const getModelId = (name: string): string | null => {
    const model = Model.find((m) => m.name === name);
    return model ? model.id : null;
};
export const getModelName = (name: string): string | null => {
    const model = Model.find((m) => m.name === name);
    return model ? model.title : null;
};
