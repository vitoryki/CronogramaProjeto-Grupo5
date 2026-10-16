import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

type IconName =
  | "roadmap"
  | "calendar"
  | "table"
  | "filter"
  | "search"
  | "plus"
  | "chevron"
  | "users"
  | "flag"
  | "clock"
  | "check"
  | "alert"
  | "link"
  | "trash"
  | "undo"
  | "more";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    roadmap: (
      <>
        <path d="M5 5h4v4H5zM15 15h4v4h-4zM5 15h4v4H5z" />
        <path d="M9 7h7a2 2 0 0 1 2 2v1M9 17h6M7 9v6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    table: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18M9 10v10" />
      </>
    ),
    filter: <path d="M4 5h16l-6.3 7.1V19l-3.4 1v-7.9z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    users: (
      <>
        <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M18 8a4 4 0 0 1 0 7.7M22 20v-2a4 4 0 0 0-3-3.9" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 5h11l-2 4 2 4H5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    alert: (
      <>
        <path d="M12 3 2.8 20h18.4z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" />
      </>
    ),
    undo: (
      <>
        <path d="m9 7-5 5 5 5" />
        <path d="M5 12h8a6 6 0 0 1 6 6v1" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

const phases = [
  {
    id: "01",
    name: "Descoberta & alinhamento",
    dates: "14–23 out",
    color: "amber",
    tasks: [
      { name: "Kickoff e alinhamento de objetivos", owner: "", role: "", start: 1, span: 1, duration: "2 dias", status: "done", dep: "—" },
      { name: "Mapeamento de stakeholders e riscos", owner: "", role: "", start: 1, span: 2, duration: "4 dias", status: "done", dep: "Kickoff" },
      { name: "Pesquisa e levantamento de requisitos", owner: "", role: "", start: 1, span: 2, duration: "7 dias", status: "active", dep: "Kickoff" },
    ],
  },
  {
    id: "02",
    name: "Estratégia & definição",
    dates: "26 out–06 nov",
    color: "violet",
    tasks: [
      { name: "Síntese de insights e priorização", owner: "", role: "", start: 3, span: 1, duration: "3 dias", status: "planned", dep: "Pesquisa" },
      { name: "Escopo, métricas e plano de entrega", owner: "", role: "", start: 3, span: 2, duration: "6 dias", status: "planned", dep: "Requisitos" },
      { name: "Arquitetura da solução", owner: "", role: "", start: 4, span: 2, duration: "5 dias", status: "planned", dep: "Escopo" },
    ],
  },
  {
    id: "03",
    name: "Design & validação",
    dates: "09–20 nov",
    color: "blue",
    tasks: [
      { name: "Fluxos e protótipo de alta fidelidade", owner: "", role: "", start: 5, span: 2, duration: "8 dias", status: "planned", dep: "Arquitetura" },
      { name: "Validação com usuários", owner: "", role: "", start: 6, span: 1, duration: "3 dias", status: "planned", dep: "Protótipo" },
      { name: "Handoff e refinamento técnico", owner: "", role: "", start: 6, span: 2, duration: "4 dias", status: "planned", dep: "Validação" },
    ],
  },
  {
    id: "04",
    name: "Desenvolvimento",
    dates: "16 nov–04 dez",
    color: "green",
    tasks: [
      { name: "Implementação — ciclo 1", owner: "", role: "", start: 6, span: 2, duration: "8 dias", status: "planned", dep: "Handoff" },
      { name: "Implementação — ciclo 2", owner: "", role: "", start: 7, span: 2, duration: "9 dias", status: "planned", dep: "Ciclo 1" },
      { name: "QA integrado e correções", owner: "", role: "", start: 8, span: 2, duration: "5 dias", status: "planned", dep: "Ciclo 2" },
    ],
  },
  {
    id: "05",
    name: "Entrega & encerramento",
    dates: "07–11 dez",
    color: "coral",
    tasks: [
      { name: "Homologação e aceite final", owner: "", role: "", start: 9, span: 1, duration: "3 dias", status: "planned", dep: "QA integrado" },
      { name: "Go-live, documentação e retrospectiva", owner: "", role: "", start: 9, span: 1, duration: "2 dias", status: "milestone", dep: "Aceite final" },
    ],
  },
];

const initialSchedule = phases.map((phase) => ({
  ...phase,
  tasks: phase.tasks.map((task) => ({
    ...task,
    risk:
      task.status === "active" ||
      task.name.toLowerCase().includes("validação") ||
      task.name.toLowerCase().includes("homologação"),
  })),
}));

const weeks = [
  ["OUT", "14"],
  ["OUT", "19"],
  ["OUT", "26"],
  ["NOV", "02"],
  ["NOV", "09"],
  ["NOV", "16"],
  ["NOV", "23"],
  ["NOV", "30"],
  ["DEZ", "07"],
];

const weekStarts = [
  new Date(2026, 9, 14),
  new Date(2026, 9, 19),
  new Date(2026, 9, 26),
  new Date(2026, 10, 2),
  new Date(2026, 10, 9),
  new Date(2026, 10, 16),
  new Date(2026, 10, 23),
  new Date(2026, 10, 30),
  new Date(2026, 11, 7),
];

const statusLabels: Record<string, string> = {
  done: "Concluída",
  active: "Em andamento",
  planned: "Planejada",
  milestone: "Planejada",
};

function getTaskPeriod(task: { start: number; duration: string }) {
  const start = weekStarts[task.start - 1] ?? weekStarts[0];
  const days = Number.parseInt(task.duration, 10) || 1;
  const end = new Date(start);
  end.setDate(end.getDate() + days - 1);
  return { start, end };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" })
    .format(date)
    .replace(".", "");
}

function calculatePerPerson(total: string, peopleCount: number) {
  if (!peopleCount) return "0,00";
  const normalized = total.includes(",")
    ? total.replace(/\./g, "").replace(",", ".")
    : total;
  const numericTotal = Number.parseFloat(normalized);
  if (!Number.isFinite(numericTotal)) return "0,00";
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericTotal / peopleCount);
}

const pageNames = {
  schedule: "Cronograma do projeto",
  activities: "Atividades",
  team: "Equipe",
  risks: "Riscos",
  shopping: "Lista de Compras",
  bills: "Contas a Pagar",
};

type Section = keyof typeof pageNames;

type ShoppingItem = {
  id: number;
  name: string;
  link: string;
  value: string;
  purchased: boolean;
};

type BillPerson = {
  id: number;
  name: string;
  paid: boolean;
};

type BillItem = {
  id: number;
  shoppingItemId: number;
  name: string;
  value: string;
  purchaser: string;
  pix: string;
  people: BillPerson[];
};

const initialLabels = {
  product: "ReciMap",
  project: "Lançamento plataforma",
  projectSubtitle: "Planejamento e execução",
  pageTitle: "ReciMap - lançamento",
};

type HistorySnapshot = {
  scheduleData: typeof initialSchedule;
  ownerHistory: string[];
  roleDirectory: Record<string, string>;
  labels: typeof initialLabels;
  shoppingItems: ShoppingItem[];
  billItems: BillItem[];
};

type SharedProjectState = {
  scheduleData: typeof initialSchedule;
  ownerHistory: string[];
  roleDirectory: Record<string, string>;
  shoppingItems: ShoppingItem[];
  billItems: BillItem[];
  updatedAt?: string;
};

const projectStateUrl = `https://${projectId}.supabase.co/functions/v1/make-server-3d9d32df/project-state`;

function loadStoredData<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [view, setView] = useState<"timeline" | "list">("timeline");
  const [activeSection, setActiveSection] = useState<Section>("schedule");
  const [expanded, setExpanded] = useState<string[]>(phases.map((phase) => phase.id));
  const [query, setQuery] = useState("");
  const [todayOnly, setTodayOnly] = useState(false);
  const [activeOwnerField, setActiveOwnerField] = useState<string | null>(null);
  const [activeDependencyField, setActiveDependencyField] = useState<string | null>(null);
  const [ownerHistory, setOwnerHistory] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("recimap-owner-history") ?? "[]");
    } catch {
      return [];
    }
  });
  const [roleDirectory, setRoleDirectory] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem("recimap-owner-roles") ?? "{}");
    } catch {
      return {};
    }
  });
  const [scheduleData, setScheduleData] = useState<typeof initialSchedule>(() =>
    loadStoredData("recimap-schedule", initialSchedule),
  );
  const [labels, setLabels] = useState(initialLabels);
  const [history, setHistory] = useState<HistorySnapshot[]>([]);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(() =>
    loadStoredData("recimap-shopping-items", []),
  );
  const [billItems, setBillItems] = useState<BillItem[]>(() =>
    loadStoredData("recimap-bill-items", []),
  );
  const [selectedShoppingItem, setSelectedShoppingItem] = useState("");
  const [openBills, setOpenBills] = useState<number[]>([]);
  const [serverReady, setServerReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"loading" | "saving" | "saved" | "error">("loading");
  const lastServerUpdate = useRef<string | null>(null);
  const pendingServerSave = useRef(false);
  const skipNextServerSave = useRef(false);

  useEffect(() => {
    localStorage.setItem("recimap-schedule", JSON.stringify(scheduleData));
  }, [scheduleData]);

  useEffect(() => {
    localStorage.setItem("recimap-shopping-items", JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    localStorage.setItem("recimap-bill-items", JSON.stringify(billItems));
  }, [billItems]);

  useEffect(() => {
    let active = true;

    const loadSharedState = async () => {
      try {
        const response = await fetch(projectStateUrl, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            apikey: publicAnonKey,
          },
        });
        if (!response.ok) throw new Error(`Load failed with ${response.status}`);
        const result = await response.json();
        const state = result.state as SharedProjectState | null;
        if (active && state) {
          lastServerUpdate.current = state.updatedAt ?? null;
          setScheduleData(state.scheduleData ?? initialSchedule);
          setOwnerHistory(state.ownerHistory ?? []);
          setRoleDirectory(state.roleDirectory ?? {});
          setShoppingItems(state.shoppingItems ?? []);
          setBillItems(state.billItems ?? []);
          localStorage.setItem("recimap-owner-history", JSON.stringify(state.ownerHistory ?? []));
          localStorage.setItem("recimap-owner-roles", JSON.stringify(state.roleDirectory ?? {}));
        }
        if (active) {
          setServerReady(true);
          setSyncStatus("saved");
        }
      } catch (error) {
        console.error("Não foi possível carregar o estado compartilhado:", error);
        if (active) {
          setServerReady(true);
          setSyncStatus("error");
        }
      }
    };

    loadSharedState();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!serverReady) return;
    if (skipNextServerSave.current) {
      skipNextServerSave.current = false;
      return;
    }

    setSyncStatus("saving");
    pendingServerSave.current = true;

    const timeout = window.setTimeout(async () => {
      const state: SharedProjectState = {
        scheduleData,
        ownerHistory,
        roleDirectory,
        shoppingItems,
        billItems,
      };
      try {
        const response = await fetch(projectStateUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            apikey: publicAnonKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        });
        if (!response.ok) throw new Error(`Save failed with ${response.status}`);
        const result = await response.json();
        lastServerUpdate.current = result.updatedAt ?? lastServerUpdate.current;
        pendingServerSave.current = false;
        setSyncStatus("saved");
      } catch (error) {
        console.error("Não foi possível salvar o estado compartilhado:", error);
        pendingServerSave.current = false;
        setSyncStatus("error");
      }
    }, 500);

    return () => {
      window.clearTimeout(timeout);
      pendingServerSave.current = false;
    };
  }, [billItems, ownerHistory, roleDirectory, scheduleData, serverReady, shoppingItems]);

  useEffect(() => {
    if (!serverReady) return;

    const refreshSharedState = async () => {
      if (pendingServerSave.current) return;
      try {
        const response = await fetch(projectStateUrl, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            apikey: publicAnonKey,
          },
        });
        if (!response.ok) throw new Error(`Refresh failed with ${response.status}`);
        const result = await response.json();
        const state = result.state as SharedProjectState | null;
        if (!state?.updatedAt || state.updatedAt === lastServerUpdate.current) return;

        lastServerUpdate.current = state.updatedAt;
        skipNextServerSave.current = true;
        setScheduleData(state.scheduleData ?? initialSchedule);
        setOwnerHistory(state.ownerHistory ?? []);
        setRoleDirectory(state.roleDirectory ?? {});
        setShoppingItems(state.shoppingItems ?? []);
        setBillItems(state.billItems ?? []);
        localStorage.setItem("recimap-owner-history", JSON.stringify(state.ownerHistory ?? []));
        localStorage.setItem("recimap-owner-roles", JSON.stringify(state.roleDirectory ?? {}));
        setSyncStatus("saved");
      } catch (error) {
        console.error("Não foi possível atualizar os dados compartilhados:", error);
        setSyncStatus("error");
      }
    };

    const interval = window.setInterval(refreshSharedState, 3000);
    return () => window.clearInterval(interval);
  }, [serverReady]);
  const totalTasks = scheduleData.reduce((total, phase) => total + phase.tasks.length, 0);
  const completedTasks = scheduleData.reduce(
    (total, phase) => total + phase.tasks.filter((task) => task.status === "done").length,
    0,
  );
  const activeTasks = scheduleData.reduce(
    (total, phase) => total + phase.tasks.filter((task) => task.status === "active").length,
    0,
  );
  const plannedTasks = totalTasks - completedTasks - activeTasks;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const allTasks = useMemo(
    () =>
      scheduleData
        .flatMap((phase) =>
          phase.tasks.map((task, taskIndex) => ({
            task,
            taskIndex,
            phase,
            ...getTaskPeriod(task),
          })),
        )
        .sort((a, b) => a.start.getTime() - b.start.getTime()),
    [scheduleData],
  );
  const riskTasks = allTasks.filter(({ task }) => task.risk);
  const savedOwners = useMemo(
    () =>
      Array.from(
        new Set(
          [
            ...ownerHistory,
            ...scheduleData.flatMap((phase) => phase.tasks.map((task) => task.owner.trim())),
          ].filter(Boolean),
        ),
      ).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [ownerHistory, scheduleData],
  );

  const saveOwnerSuggestion = (owner: string) => {
    const cleanOwner = owner.trim();
    if (!cleanOwner) return;
    setOwnerHistory((current) => {
      if (current.some((item) => item.toLocaleLowerCase() === cleanOwner.toLocaleLowerCase())) return current;
      const updated = [...current, cleanOwner].sort((a, b) => a.localeCompare(b, "pt-BR"));
      localStorage.setItem("recimap-owner-history", JSON.stringify(updated));
      return updated;
    });
  };

  const getOwnerSuggestions = (value: string) =>
    savedOwners
      .filter((owner) => owner.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase()))
      .filter((owner) => owner.toLocaleLowerCase() !== value.trim().toLocaleLowerCase())
      .slice(0, 6);

  const activityNames = useMemo(
    () => Array.from(new Set(scheduleData.flatMap((phase) => phase.tasks.map((task) => task.name.trim())).filter(Boolean))),
    [scheduleData],
  );

  const getDependencySuggestions = (activityName: string, value: string) => {
    const search = value === "—" ? "" : value.trim().toLocaleLowerCase();
    return activityNames
      .filter((name) => name !== activityName)
      .filter((name) => name.toLocaleLowerCase().includes(search))
      .slice(0, 7);
  };

  const getBarStyle = (task: { start: number; duration: string }) => {
    const days = Math.max(1, Number.parseInt(task.duration, 10) || 1);
    const left = ((task.start - 1) / weeks.length) * 100;
    const width = Math.min((days / 7 / weeks.length) * 100, 100 - left);
    return { left: `${left}%`, width: `${Math.max(width, 1.6)}%` } as CSSProperties;
  };

  const recordSnapshot = () => {
    const snapshot = { scheduleData, ownerHistory, roleDirectory, labels, shoppingItems, billItems };
    setHistory((current) => [...current.slice(-49), snapshot]);
  };

  const undoLastAction = () => {
    const snapshot = history.at(-1);
    if (!snapshot) return;
    setScheduleData(snapshot.scheduleData);
    setOwnerHistory(snapshot.ownerHistory);
    setRoleDirectory(snapshot.roleDirectory);
    setLabels(snapshot.labels);
    setShoppingItems(snapshot.shoppingItems);
    setBillItems(snapshot.billItems);
    localStorage.setItem("recimap-owner-history", JSON.stringify(snapshot.ownerHistory));
    localStorage.setItem("recimap-owner-roles", JSON.stringify(snapshot.roleDirectory));
    setHistory((current) => current.slice(0, -1));
    setActiveOwnerField(null);
    setActiveDependencyField(null);
  };

  const addShoppingItem = () => {
    recordSnapshot();
    setShoppingItems((current) => [
      ...current,
      { id: Date.now(), name: "", link: "", value: "", purchased: false },
    ]);
  };

  const updateShoppingItem = (
    id: number,
    field: "name" | "link" | "value" | "purchased",
    value: string | boolean,
  ) => {
    recordSnapshot();
    setShoppingItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const deleteShoppingItem = (id: number) => {
    recordSnapshot();
    setShoppingItems((current) => current.filter((item) => item.id !== id));
  };

  const importShoppingItem = () => {
    const source = shoppingItems.find((item) => item.id === Number(selectedShoppingItem));
    if (!source) return;
    recordSnapshot();
    const id = Date.now();
    setBillItems((current) => [
      ...current,
      {
        id,
        shoppingItemId: source.id,
        name: source.name || "Item sem nome",
        value: source.value,
        purchaser: "",
        pix: "",
        people: [],
      },
    ]);
    setOpenBills((current) => [...current, id]);
    setSelectedShoppingItem("");
  };

  const updateBillDetails = (
    billId: number,
    field: "purchaser" | "pix" | "value",
    value: string,
  ) => {
    recordSnapshot();
    setBillItems((current) =>
      current.map((bill) => (bill.id === billId ? { ...bill, [field]: value } : bill)),
    );
  };

  const addBillPerson = (billId: number) => {
    recordSnapshot();
    setBillItems((current) =>
      current.map((bill) =>
        bill.id === billId
          ? { ...bill, people: [...bill.people, { id: Date.now(), name: "", paid: false }] }
          : bill,
      ),
    );
    setOpenBills((current) => current.includes(billId) ? current : [...current, billId]);
  };

  const updateBillPerson = (
    billId: number,
    personId: number,
    field: "name" | "paid",
    value: string | boolean,
  ) => {
    recordSnapshot();
    setBillItems((current) =>
      current.map((bill) =>
        bill.id === billId
          ? {
              ...bill,
              people: bill.people.map((person) =>
                person.id === personId ? { ...person, [field]: value } : person,
              ),
            }
          : bill,
      ),
    );
  };

  const deleteBillPerson = (billId: number, personId: number) => {
    recordSnapshot();
    setBillItems((current) =>
      current.map((bill) =>
        bill.id === billId
          ? { ...bill, people: bill.people.filter((person) => person.id !== personId) }
          : bill,
      ),
    );
  };

  const deleteBillItem = (billId: number) => {
    recordSnapshot();
    setBillItems((current) => current.filter((bill) => bill.id !== billId));
    setOpenBills((current) => current.filter((id) => id !== billId));
  };

  const filtered = useMemo(
    () =>
      scheduleData
        .map((phase) => ({
          ...phase,
          tasks: phase.tasks.map((task, taskIndex) => ({ ...task, taskIndex })).filter((task) => {
            const matchesQuery = `${task.name} ${task.owner}`.toLowerCase().includes(query.toLowerCase());
            if (!todayOnly) return matchesQuery;
            const { start, end } = getTaskPeriod(task);
            return matchesQuery && today >= start && today <= end;
          }),
        }))
        .filter((phase) => phase.tasks.length > 0 || (!query.trim() && !todayOnly)),
    [query, scheduleData, todayOnly],
  );

  const updateTask = (
    phaseId: string,
    taskIndex: number,
    field: "name" | "owner" | "role" | "duration" | "dep",
    value: string,
  ) => {
    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map((task, index) =>
                index === taskIndex ? { ...task, [field]: value } : task,
              ),
            }
          : phase,
      ),
    );
  };

  const assignOwner = (phaseId: string, taskIndex: number, owner: string) => {
    const normalizedOwner = owner.trim().toLocaleLowerCase();
    const existingRole =
      roleDirectory[normalizedOwner] ??
      scheduleData
        .flatMap((phase) => phase.tasks)
        .find((task) => task.owner.trim().toLocaleLowerCase() === normalizedOwner && task.role.trim())
        ?.role ??
      "";

    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map((task, index) =>
                index === taskIndex ? { ...task, owner, role: existingRole } : task,
              ),
            }
          : phase,
      ),
    );
  };

  const updateRoleForOwner = (owner: string, role: string) => {
    const normalizedOwner = owner.trim().toLocaleLowerCase();
    if (!normalizedOwner) return;

    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) =>
          task.owner.trim().toLocaleLowerCase() === normalizedOwner ? { ...task, role } : task,
        ),
      })),
    );
    setRoleDirectory((current) => {
      const updated = { ...current, [normalizedOwner]: role };
      localStorage.setItem("recimap-owner-roles", JSON.stringify(updated));
      return updated;
    });
  };

  const removeOwner = (owner: string) => {
    const normalizedOwner = owner.trim().toLocaleLowerCase();
    if (!normalizedOwner) return;

    recordSnapshot();
    setOwnerHistory((current) => {
      const updated = current.filter((item) => item.trim().toLocaleLowerCase() !== normalizedOwner);
      localStorage.setItem("recimap-owner-history", JSON.stringify(updated));
      return updated;
    });
    setRoleDirectory((current) => {
      const updated = { ...current };
      delete updated[normalizedOwner];
      localStorage.setItem("recimap-owner-roles", JSON.stringify(updated));
      return updated;
    });
    setScheduleData((current) =>
      current.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) =>
          task.owner.trim().toLocaleLowerCase() === normalizedOwner
            ? { ...task, owner: "", role: "" }
            : task,
        ),
      })),
    );
    setActiveOwnerField(null);
  };

  const deleteTask = (phaseId: string, taskIndex: number) => {
    const deletedName = scheduleData
      .find((phase) => phase.id === phaseId)
      ?.tasks[taskIndex]?.name.trim();

    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) => ({
        ...phase,
        tasks: phase.tasks
          .filter((_, index) => phase.id !== phaseId || index !== taskIndex)
          .map((task) =>
            deletedName && task.dep.trim().toLocaleLowerCase() === deletedName.toLocaleLowerCase()
              ? { ...task, dep: "—" }
              : task,
          ),
      })),
    );
  };

  const updatePhaseName = (phaseId: string, name: string) => {
    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) => (phase.id === phaseId ? { ...phase, name } : phase)),
    );
  };

  const updatePhaseDates = (phaseId: string, dates: string) => {
    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) => (phase.id === phaseId ? { ...phase, dates } : phase)),
    );
  };

  const updateTaskStatus = (phaseId: string, taskIndex: number, status: string) => {
    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map((task, index) =>
                index === taskIndex ? { ...task, status } : task,
              ),
            }
          : phase,
      ),
    );
  };

  const toggleTaskRisk = (phaseId: string, taskIndex: number) => {
    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map((task, index) =>
                index === taskIndex ? { ...task, risk: !task.risk } : task,
              ),
            }
          : phase,
      ),
    );
  };

  const addTask = (phaseId: string) => {
    recordSnapshot();
    setScheduleData((current) =>
      current.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: [
                ...phase.tasks,
                {
                  name: "Nova atividade",
                  owner: "",
                  role: "",
                  start: phase.tasks[0]?.start ?? 1,
                  span: 1,
                  duration: "1 dia",
                  status: "planned",
                  dep: "—",
                  risk: false,
                },
              ],
            }
          : phase,
      ),
    );
    setExpanded((current) => current.includes(phaseId) ? current : [...current, phaseId]);
  };

  const togglePhase = (id: string) =>
    setExpanded((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark"><img src="/cesar-logo.png" alt="CESAR School" /></span>
          <strong className="brand-product-name">{labels.product}</strong>
          <span className="slash">/</span>
          <strong className="current-page-name">{pageNames[activeSection]}</strong>
        </div>
        <div className="top-actions">
          <button
            aria-label="Desfazer última ação"
            className="undo-button"
            disabled={history.length === 0}
            title={history.length ? "Desfazer última ação" : "Nenhuma ação para desfazer"}
            onClick={undoLastAction}
          >
            <Icon name="undo" size={17} />
            <span>Desfazer</span>
          </button>
          <span className={`saved sync-${syncStatus}`}>
            <span className="saved-dot" />
            {syncStatus === "loading" && "Carregando dados..."}
            {syncStatus === "saving" && "Salvando..."}
            {syncStatus === "saved" && "Salvo no servidor"}
            {syncStatus === "error" && "Erro ao sincronizar"}
          </span>
        </div>
      </header>

      <section className="workspace">
        <aside className="sidebar">
          <div className="sidebar-heading">
            <span className="eyebrow">PROJETO</span>
            <strong className="project-name-fixed">{labels.project}</strong>
            <span className="project-subtitle-fixed">{labels.projectSubtitle}</span>
          </div>

          <nav className="side-nav" aria-label="Navegação do projeto">
            <button className={`nav-item ${activeSection === "schedule" ? "active" : ""}`} onClick={() => setActiveSection("schedule")}><Icon name="roadmap" /> Cronograma <span>{totalTasks}</span></button>
            <button className={`nav-item ${activeSection === "activities" ? "active" : ""}`} onClick={() => setActiveSection("activities")}><Icon name="table" /> Atividades</button>
            <button className={`nav-item ${activeSection === "team" ? "active" : ""}`} onClick={() => setActiveSection("team")}><Icon name="users" /> Equipe</button>
            <button className={`nav-item ${activeSection === "risks" ? "active" : ""}`} onClick={() => setActiveSection("risks")}><Icon name="alert" /> Riscos <span>{riskTasks.length}</span></button>
            <div className="nav-divider" />
            <button className={`nav-item ${activeSection === "shopping" ? "active" : ""}`} onClick={() => setActiveSection("shopping")}><Icon name="table" /> Lista de Compras</button>
            <button className={`nav-item ${activeSection === "bills" ? "active" : ""}`} onClick={() => setActiveSection("bills")}><Icon name="calendar" /> Contas a Pagar</button>
          </nav>

          <div className="project-card">
            <div className="card-label"><Icon name="flag" size={15} /> Progresso geral</div>
            <div className="progress-number"><strong>{progress}%</strong><span>do projeto</span></div>
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            <div className="date-pair">
              <div><span>Início</span><strong>14 out 2026</strong></div>
              <div><span>Entrega</span><strong>11 dez 2026</strong></div>
            </div>
          </div>

          <div className="sidebar-footer">
            <div className="legend-title">STATUS</div>
            <span><i className="dot done" />Concluído</span>
            <span><i className="dot active" />Em andamento</span>
            <span><i className="dot planned" />Planejado</span>
          </div>
        </aside>

        <section className="content">
          <div className="page-head">
            <div>
              <div className="title-row">
                <h1 className="page-title-fixed">{labels.pageTitle}</h1>
                <span className="status-badge">NO PRAZO</span>
              </div>
              <p>14 de outubro a 11 de dezembro de 2026 <span>•</span> 9 semanas <span>•</span> {totalTasks} atividades</p>
            </div>
            <div className="summary">
              <div><span>{completedTasks}</span><small>Concluídas</small></div>
              <div><span>{activeTasks}</span><small>Em andamento</small></div>
              <div><span>{plannedTasks}</span><small>Planejadas</small></div>
            </div>
          </div>

          <div className="toolbar">
            {activeSection === "schedule" ? (
              <div className="view-switch">
                <button className={view === "timeline" ? "selected" : ""} onClick={() => setView("timeline")}><Icon name="calendar" size={16} /> Timeline</button>
                <button className={view === "list" ? "selected" : ""} onClick={() => setView("list")}><Icon name="table" size={16} /> Lista</button>
              </div>
            ) : (
              <div className="section-context">
                <Icon name={activeSection === "team" ? "users" : activeSection === "risks" ? "alert" : activeSection === "bills" ? "calendar" : "table"} size={16} />
                {activeSection === "activities" && "Todas as atividades"}
                {activeSection === "team" && "Atividades por pessoa"}
                {activeSection === "risks" && "Atividades em risco"}
                {activeSection === "shopping" && "Lista de Compras"}
                {activeSection === "bills" && "Contas a Pagar"}
              </div>
            )}
            <div className="toolbar-actions">
              <label className="search-box">
                <Icon name="search" size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={activeSection === "team" ? "Buscar pessoa..." : "Buscar atividade..."}
                />
              </label>
              <button
                className={activeSection === "risks" ? "tool-button active-filter" : "tool-button"}
                onClick={() => setActiveSection(activeSection === "risks" ? "schedule" : "risks")}
              >
                <Icon name="filter" size={16} /> Riscos {activeSection === "risks" && <b>{riskTasks.length}</b>}
              </button>
              <button
                className={todayOnly ? "today-button active-filter" : "today-button"}
                onClick={() => {
                  setActiveSection("schedule");
                  setTodayOnly((current) => !current);
                }}
              >
                Hoje
              </button>
            </div>
          </div>

          {todayOnly && activeSection === "schedule" && (
            <div className="today-banner">
              <Icon name="calendar" size={16} />
              <span>Exibindo atividades previstas para hoje, {formatDate(today)}.</span>
              <button onClick={() => setTodayOnly(false)}>Limpar filtro</button>
            </div>
          )}

          {activeSection === "schedule" ? <div className={`schedule ${view === "list" ? "list-view" : ""}`}>
            <div className="schedule-head">
              <div className="activity-column">FASE / ATIVIDADE</div>
              <div className="owner-column">RESPONSÁVEL</div>
              <div className="duration-column">DURAÇÃO</div>
              <div className="week-grid">
                {weeks.map(([month, day], index) => (
                  <div className={index === 0 ? "current" : ""} key={`${month}-${day}`}>
                    <small>{month}</small><strong>{day}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="schedule-body">
              {filtered.map((phase) => (
                <div className={`phase phase-${phase.color}`} key={phase.id}>
                  <div className="phase-header">
                    <button
                      aria-label={expanded.includes(phase.id) ? "Recolher fase" : "Expandir fase"}
                      className={`phase-chevron ${expanded.includes(phase.id) ? "open" : ""}`}
                      onClick={() => togglePhase(phase.id)}
                    >
                      <Icon name="chevron" size={15} />
                    </button>
                    <span className="phase-index">{phase.id}</span>
                    <input
                      aria-label="Nome da fase"
                      className="phase-name phase-name-edit"
                      value={phase.name}
                      onChange={(event) => updatePhaseName(phase.id, event.target.value)}
                    />
                    <input
                      aria-label={`Período da fase ${phase.name}`}
                      className="phase-dates phase-dates-edit"
                      value={phase.dates}
                      onChange={(event) => updatePhaseDates(phase.id, event.target.value)}
                    />
                    <span className="phase-count">{phase.tasks.length} atividades</span>
                    <button className="add-task-button" onClick={() => addTask(phase.id)}>
                      <Icon name="plus" size={13} /> Adicionar atividade
                    </button>
                  </div>
                  {expanded.includes(phase.id) && phase.tasks.map((task) => (
                    <div className="task-row" key={`${phase.id}-${task.taskIndex}`}>
                      <div className="task-name">
                        <label className={`status-icon ${task.status}`} title="Alterar status">
                          <Icon name={task.status === "done" ? "check" : task.status === "milestone" ? "flag" : "clock"} size={13} />
                          <select
                            aria-label={`Status de ${task.name}`}
                            value={task.status === "milestone" ? "planned" : task.status}
                            onChange={(event) => updateTaskStatus(phase.id, task.taskIndex, event.target.value)}
                          >
                            <option value="planned">Planejada</option>
                            <option value="active">Em andamento</option>
                            <option value="done">Concluída</option>
                          </select>
                        </label>
                        <div className="editable-stack">
                          <input
                            aria-label="Nome da atividade"
                            className="editable-field task-edit"
                            value={task.name}
                            onChange={(event) => updateTask(phase.id, task.taskIndex, "name", event.target.value)}
                          />
                          <div className="dependency-edit dependency-autocomplete">
                            <Icon name="link" size={11} />
                            <span>Depende de:</span>
                            <input
                              aria-label="Dependência"
                              className="editable-field"
                              value={task.dep}
                              onChange={(event) => updateTask(phase.id, task.taskIndex, "dep", event.target.value)}
                              onFocus={() => setActiveDependencyField(`${phase.id}-${task.taskIndex}`)}
                              onBlur={() => window.setTimeout(() => setActiveDependencyField(null), 120)}
                            />
                            {activeDependencyField === `${phase.id}-${task.taskIndex}` && getDependencySuggestions(task.name, task.dep).length > 0 && (
                              <div className="owner-suggestions dependency-suggestions">
                                <span className="suggestion-label">ATIVIDADES EXISTENTES</span>
                                {getDependencySuggestions(task.name, task.dep).map((activity) => (
                                  <button
                                    key={activity}
                                    onMouseDown={(event) => {
                                      event.preventDefault();
                                      updateTask(phase.id, task.taskIndex, "dep", activity);
                                      setActiveDependencyField(null);
                                    }}
                                  >
                                    <span className="suggestion-link"><Icon name="link" size={12} /></span>
                                    {activity}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="task-actions">
                          <button
                            aria-label={task.risk ? `Remover ${task.name} dos riscos` : `Adicionar ${task.name} aos riscos`}
                            className={`risk-task-button ${task.risk ? "marked" : ""}`}
                            title={task.risk ? "Remover dos riscos" : "Marcar como atividade em risco"}
                            onClick={() => toggleTaskRisk(phase.id, task.taskIndex)}
                          >
                            <Icon name="alert" size={14} />
                          </button>
                          <button
                            aria-label={`Excluir atividade ${task.name}`}
                            className="delete-task-button"
                            title="Excluir atividade"
                            onClick={() => deleteTask(phase.id, task.taskIndex)}
                          >
                            <Icon name="trash" size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="task-owner">
                        <span className="person-avatar empty-avatar"><Icon name="users" size={13} /></span>
                        <div
                          className="editable-stack owner-autocomplete"
                          onBlur={(event) => {
                            const nextTarget = event.relatedTarget;
                            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                              setActiveOwnerField(null);
                            }
                          }}
                        >
                          <input
                            aria-label="Responsável"
                            className="editable-field owner-edit"
                            placeholder="Definir responsável"
                            value={task.owner}
                            onChange={(event) => assignOwner(phase.id, task.taskIndex, event.target.value)}
                            onFocus={() => setActiveOwnerField(`${phase.id}-${task.taskIndex}`)}
                            onBlur={(event) => {
                              saveOwnerSuggestion(event.target.value);
                              assignOwner(phase.id, task.taskIndex, event.target.value);
                            }}
                          />
                          {activeOwnerField === `${phase.id}-${task.taskIndex}` && getOwnerSuggestions(task.owner).length > 0 && (
                            <div className="owner-suggestions">
                              <span className="suggestion-label">RESPONSÁVEIS SALVOS</span>
                              {getOwnerSuggestions(task.owner).map((owner) => (
                                <div className="suggestion-row" key={owner}>
                                  <button
                                    className="suggestion-select"
                                    onMouseDown={(event) => {
                                      event.preventDefault();
                                      assignOwner(phase.id, task.taskIndex, owner);
                                      setActiveOwnerField(null);
                                    }}
                                  >
                                    <span className="suggestion-avatar">{owner.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>
                                    {owner}
                                  </button>
                                  <button
                                    aria-label={`Excluir responsável ${owner}`}
                                    className="suggestion-delete"
                                    title="Excluir responsável cadastrado"
                                    onMouseDown={(event) => {
                                      event.preventDefault();
                                      event.stopPropagation();
                                      removeOwner(owner);
                                    }}
                                  >
                                    <Icon name="trash" size={13} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          <input
                            aria-label="Função do responsável"
                            className="editable-field role-edit"
                            placeholder={task.owner.trim() ? "Função" : "Defina o responsável"}
                            value={task.role}
                            disabled={!task.owner.trim()}
                            onChange={(event) => updateRoleForOwner(task.owner, event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="task-duration">
                        <label className="duration-control">
                          <input
                            aria-label="Duração em dias"
                            className="editable-field duration-edit"
                            type="number"
                            min="1"
                            max="59"
                            value={Number.parseInt(task.duration, 10) || 1}
                            onChange={(event) => updateTask(phase.id, task.taskIndex, "duration", `${Math.max(1, Number(event.target.value))} dias`)}
                          />
                          <span>dias</span>
                        </label>
                      </div>
                      <div className="task-timeline">
                        <div className="grid-lines">{weeks.map((week) => <i key={week.join("-")} />)}</div>
                        {view === "timeline" && (
                          <div
                            className={`gantt-bar ${task.status} color-${phase.color}`}
                            style={getBarStyle(task)}
                          >
                            <span>{task.status === "done" && <Icon name="check" size={12} />}{task.taskIndex === 0 ? phase.name.split(" ")[0] : task.duration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {expanded.includes(phase.id) && phase.tasks.length === 0 && (
                    <div className="empty-phase">
                      <div>
                        <strong>Nenhuma atividade nesta fase</strong>
                        <span>Adicione uma atividade para continuar o planejamento.</span>
                      </div>
                      <button onClick={() => addTask(phase.id)}>
                        <Icon name="plus" size={14} /> Adicionar atividade
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="empty-state">
                  {todayOnly ? `Não há atividades previstas ou entregas para hoje, ${formatDate(today)}.` : `Nenhuma atividade encontrada para “${query}”.`}
                </div>
              )}
            </div>
          </div> : (
            <div className="overview-panel">
              {activeSection === "activities" && (
                <div className="overview-list">
                  {allTasks
                    .filter(({ task }) => `${task.name} ${task.owner}`.toLowerCase().includes(query.toLowerCase()))
                    .map(({ task, phase, start, end }, index) => (
                      <div className="overview-row" key={`${phase.id}-all-${index}`}>
                        <div className="date-block"><strong>{formatDate(start)}</strong><span>até {formatDate(end)}</span></div>
                        <span className={`status-icon ${task.status}`}><Icon name={task.status === "done" ? "check" : "clock"} size={13} /></span>
                        <div className="overview-copy"><strong>{task.name}</strong><span>{phase.name} · {task.owner || "Sem responsável"}</span></div>
                        <span className={`status-pill ${task.status}`}>{statusLabels[task.status]}</span>
                      </div>
                    ))}
                </div>
              )}

              {activeSection === "team" && (
                <div className="team-grid">
                  {Array.from(new Set(allTasks.map(({ task }) => task.owner.trim() || "Sem responsável")))
                    .filter((owner) => owner.toLowerCase().includes(query.toLowerCase()))
                    .map((owner) => {
                      const ownerTasks = allTasks.filter(({ task }) => (task.owner.trim() || "Sem responsável") === owner);
                      return (
                        <section className="person-card" key={owner}>
                          <div className="person-head">
                            <span className="person-avatar"><Icon name="users" size={14} /></span>
                            <div><strong>{owner}</strong><span>{ownerTasks.length} {ownerTasks.length === 1 ? "atividade" : "atividades"}</span></div>
                            {owner !== "Sem responsável" && (
                              <button
                                aria-label={`Excluir responsável ${owner}`}
                                className="person-delete"
                                title="Excluir responsável cadastrado"
                                onClick={() => removeOwner(owner)}
                              >
                                <Icon name="trash" size={14} />
                              </button>
                            )}
                          </div>
                          <div className="person-tasks">
                            {ownerTasks.map(({ task, phase, start }, index) => (
                              <div key={`${phase.id}-person-${index}`}>
                                <i className={`dot ${task.status === "milestone" ? "planned" : task.status}`} />
                                <span><strong>{task.name}</strong><small>{formatDate(start)} · {phase.name}</small></span>
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                </div>
              )}

              {activeSection === "risks" && (
                <div className="risk-list">
                  <div className="risk-summary-card"><Icon name="alert" size={20} /><div><strong>{riskTasks.length} atividades requerem atenção</strong><span>Revise responsáveis, dependências e prazos para reduzir impactos na entrega.</span></div></div>
                  {riskTasks
                    .filter(({ task }) => `${task.name} ${task.owner}`.toLowerCase().includes(query.toLowerCase()))
                    .map(({ task, phase, end }, index) => (
                      <div className="risk-row" key={`${phase.id}-risk-${index}`}>
                        <span className="risk-indicator"><Icon name="alert" size={15} /></span>
                        <div className="overview-copy"><strong>{task.name}</strong><span>{phase.name} · {task.owner || "Sem responsável"}</span></div>
                        <div className="risk-due"><span>Prazo</span><strong>{formatDate(end)}</strong></div>
                      </div>
                  ))}
                </div>
              )}

              {activeSection === "shopping" && (
                <div className="shopping-module">
                  <div className="shopping-head">
                    <div>
                      <strong>Itens para comprar</strong>
                      <span>{shoppingItems.length} {shoppingItems.length === 1 ? "item cadastrado" : "itens cadastrados"}</span>
                    </div>
                    <button className="shopping-add" onClick={addShoppingItem}>
                      <Icon name="plus" size={14} /> Adicionar item
                    </button>
                  </div>

                  {shoppingItems.length === 0 ? (
                    <div className="shopping-empty">
                      <span className="module-icon"><Icon name="table" size={22} /></span>
                      <strong>Sua lista está vazia</strong>
                      <p>Adicione o primeiro item que precisa ser comprado.</p>
                      <button onClick={addShoppingItem}><Icon name="plus" size={14} /> Adicionar item</button>
                    </div>
                  ) : (
                    <div className="shopping-table">
                      <div className="shopping-table-head">
                        <span>NOME</span><span>LINK</span><span>VALOR</span><span>STATUS</span><span />
                      </div>
                      {shoppingItems.map((item, index) => (
                        <div className={`shopping-row ${item.purchased ? "purchased" : ""}`} key={item.id}>
                          <label>
                            <small>Nome</small>
                            <input
                              autoFocus={index === shoppingItems.length - 1 && !item.name}
                              placeholder="Nome do item"
                              value={item.name}
                              onChange={(event) => updateShoppingItem(item.id, "name", event.target.value)}
                            />
                          </label>
                          <label className="shopping-link-field">
                            <small>Link</small>
                            <input
                              placeholder="https://"
                              type="url"
                              value={item.link}
                              onChange={(event) => updateShoppingItem(item.id, "link", event.target.value)}
                            />
                            {item.link.trim() && (
                              <a
                                aria-label={`Abrir link de ${item.name || "item"}`}
                                href={item.link.match(/^https?:\/\//i) ? item.link : `https://${item.link}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Abrir link em uma nova aba"
                              >
                                <Icon name="link" size={13} />
                              </a>
                            )}
                          </label>
                          <label className="value-field">
                            <small>Valor</small>
                            <span>R$</span>
                            <input
                              inputMode="decimal"
                              placeholder="0,00"
                              value={item.value}
                              onChange={(event) => updateShoppingItem(item.id, "value", event.target.value)}
                            />
                          </label>
                          <button
                            className={`purchase-toggle ${item.purchased ? "done" : ""}`}
                            onClick={() => updateShoppingItem(item.id, "purchased", !item.purchased)}
                          >
                            <span><Icon name={item.purchased ? "check" : "clock"} size={13} /></span>
                            {item.purchased ? "Comprado" : "Pendente"}
                          </button>
                          <button
                            aria-label={`Excluir ${item.name || "item"}`}
                            className="shopping-delete"
                            onClick={() => deleteShoppingItem(item.id)}
                          >
                            <Icon name="trash" size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === "bills" && (
                <div className="bills-module">
                  <div className="bills-import">
                    <div>
                      <strong>Contas a pagar</strong>
                      <span>Importe um item da Lista de Compras para dividir e acompanhar os pagamentos.</span>
                    </div>
                    <div className="import-controls">
                      <select
                        aria-label="Item da Lista de Compras"
                        value={selectedShoppingItem}
                        onChange={(event) => setSelectedShoppingItem(event.target.value)}
                      >
                        <option value="">Selecionar item...</option>
                        {shoppingItems.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name || "Item sem nome"}{item.value ? ` · R$ ${item.value}` : ""}
                          </option>
                        ))}
                      </select>
                      <button disabled={!selectedShoppingItem} onClick={importShoppingItem}>
                        <Icon name="plus" size={14} /> Importar item
                      </button>
                    </div>
                  </div>

                  {billItems.length === 0 ? (
                    <div className="bills-empty">
                      <span className="module-icon"><Icon name="calendar" size={22} /></span>
                      <strong>Nenhuma conta importada</strong>
                      <p>
                        {shoppingItems.length
                          ? "Selecione um item da Lista de Compras acima."
                          : "Adicione itens na Lista de Compras para importá-los aqui."}
                      </p>
                    </div>
                  ) : (
                    <div className="bill-list">
                      {billItems.map((bill) => {
                        const isOpen = openBills.includes(bill.id);
                        const paidCount = bill.people.filter((person) => person.paid).length;
                        return (
                          <section className="bill-card" key={bill.id}>
                            <div className="bill-card-head">
                              <button
                                aria-label={isOpen ? "Recolher pessoas" : "Mostrar pessoas"}
                                className={`bill-chevron ${isOpen ? "open" : ""}`}
                                onClick={() =>
                                  setOpenBills((current) =>
                                    current.includes(bill.id)
                                      ? current.filter((id) => id !== bill.id)
                                      : [...current, bill.id],
                                  )
                                }
                              >
                                <Icon name="chevron" size={15} />
                              </button>
                              <div className="bill-title">
                                <strong>{bill.name}</strong>
                                <span>{bill.people.length ? `${paidCount} de ${bill.people.length} pagamentos realizados` : "Nenhuma pessoa adicionada"}</span>
                              </div>
                              <label className="bill-detail-field purchaser-field">
                                <small>RESPONSÁVEL PELA COMPRA</small>
                                <input
                                  placeholder="Nome da pessoa"
                                  value={bill.purchaser}
                                  onChange={(event) => updateBillDetails(bill.id, "purchaser", event.target.value)}
                                />
                              </label>
                              <label className="pix-field">
                                <small>PIX</small>
                                <input
                                  placeholder="Chave Pix"
                                  value={bill.pix}
                                  onChange={(event) => updateBillDetails(bill.id, "pix", event.target.value)}
                                />
                              </label>
                              <label className="bill-detail-field bill-amount-field total-amount-field">
                                <small>VALOR TOTAL</small>
                                <span>R$</span>
                                <input
                                  inputMode="decimal"
                                  placeholder="0,00"
                                  value={bill.value}
                                  onChange={(event) => updateBillDetails(bill.id, "value", event.target.value)}
                                />
                              </label>
                              <label className="bill-detail-field bill-amount-field calculated-amount-field">
                                <small>VALOR POR PESSOA</small>
                                <span>R$</span>
                                <input
                                  aria-label="Valor calculado por pessoa"
                                  readOnly
                                  value={calculatePerPerson(bill.value, bill.people.length)}
                                />
                              </label>
                              <button className="bill-delete" aria-label={`Excluir conta ${bill.name}`} onClick={() => deleteBillItem(bill.id)}>
                                <Icon name="trash" size={14} />
                              </button>
                            </div>

                            {isOpen && (
                              <div className="bill-people">
                                <div className="people-head">
                                  <div><Icon name="users" size={15} /><strong>Pessoas</strong></div>
                                  <button onClick={() => addBillPerson(bill.id)}><Icon name="plus" size={13} /> Adicionar pessoa</button>
                                </div>
                                {bill.people.length === 0 ? (
                                  <div className="people-empty">Adicione as pessoas que participarão deste pagamento.</div>
                                ) : (
                                  bill.people.map((person, index) => (
                                    <div className="person-payment-row" key={person.id}>
                                      <span className="suggestion-avatar">{person.name ? person.name.slice(0, 2).toUpperCase() : index + 1}</span>
                                      <input
                                        autoFocus={index === bill.people.length - 1 && !person.name}
                                        placeholder="Nome da pessoa"
                                        value={person.name}
                                        onChange={(event) => updateBillPerson(bill.id, person.id, "name", event.target.value)}
                                      />
                                      <button
                                        className={`payment-toggle ${person.paid ? "paid" : ""}`}
                                        onClick={() => updateBillPerson(bill.id, person.id, "paid", !person.paid)}
                                      >
                                        <Icon name={person.paid ? "check" : "clock"} size={13} />
                                        {person.paid ? "Já paguei" : "Ainda não paguei"}
                                      </button>
                                      <button className="person-payment-delete" aria-label={`Excluir ${person.name || "pessoa"}`} onClick={() => deleteBillPerson(bill.id, person.id)}>
                                        <Icon name="trash" size={13} />
                                      </button>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </section>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <footer className="content-footer">
            <span><Icon name="flag" size={14} /> Próximo marco: <strong>Aprovação de requisitos</strong> em 23 de outubro</span>
            <span>Última revisão: 14 out 2026</span>
          </footer>
        </section>
      </section>
    </main>
  );
}
