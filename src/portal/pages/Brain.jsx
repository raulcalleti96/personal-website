import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBrain } from "react-icons/fa";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";
import { supabase } from "../../supabaseClient";

const Brain = () => {
  const { t, i18n } = useTranslation();
  const { session } = useOutletContext();

  const [link, setLink] = useState(undefined);
  const [chatIdInput, setChatIdInput] = useState("");
  const [linking, setLinking] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const [{ data: linkData }, { data: notesData }] = await Promise.all([
      supabase.from("telegram_links").select("*").maybeSingle(),
      supabase.from("brain_notes").select("*").order("created_at", { ascending: false }),
    ]);
    setLink(linkData || null);
    setNotes(notesData || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleLink = async (e) => {
    e.preventDefault();
    const chatId = Number(chatIdInput.trim());
    if (!chatId) return;
    setLinking(true);
    const { error } = await supabase
      .from("telegram_links")
      .insert({ chat_id: chatId, user_id: session.user.id });
    setLinking(false);
    if (!error) {
      setChatIdInput("");
      load();
    }
  };

  const handleUnlink = async () => {
    setLink(null);
    await supabase.from("telegram_links").delete().eq("user_id", session.user.id);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from("brain_notes")
      .insert({ user_id: session.user.id, content: noteText.trim() });
    setSaving(false);
    if (!error) {
      setNoteText("");
      load();
    }
  };

  const deleteNote = async (note) => {
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
    await supabase.from("brain_notes").delete().eq("id", note.id);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString(i18n.language === "es" ? "es-ES" : "en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("portal.nav.brain")}</h1>

      {link !== undefined && (
        <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 mb-8">
          {link ? (
            <div className="flex items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-naranja-vibrante font-semibold">
                <FiCheckCircle /> {t("portal.brain.connected", { chatId: link.chat_id })}
              </p>
              <button
                onClick={handleUnlink}
                className="text-sm text-gray-400 hover:text-red-400 transition"
              >
                {t("portal.brain.disconnect")}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-300 mb-1">{t("portal.brain.howToConnect")}</p>
              <p className="text-sm text-gray-400 mb-4">{t("portal.brain.pasteChatId")}</p>
              <form onSubmit={handleLink} className="flex gap-2">
                <input
                  value={chatIdInput}
                  onChange={(e) => setChatIdInput(e.target.value)}
                  placeholder={t("portal.brain.chatIdPlaceholder")}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
                />
                <button
                  type="submit"
                  disabled={linking}
                  className="px-4 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
                >
                  {t("portal.brain.connect")}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <form
        onSubmit={handleAddNote}
        className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 mb-8 flex gap-2"
      >
        <input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={t("portal.brain.notePlaceholder")}
          className="flex-1 px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
        />
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
        >
          {t("portal.brain.addNote")}
        </button>
      </form>

      {notes.length === 0 ? (
        <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-10 flex flex-col items-center text-center gap-3">
          <FaBrain size={32} className="text-naranja-vibrante" />
          <p className="text-gray-300 max-w-md">{t("portal.brain.empty")}</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex items-center gap-3 bg-gris-oscuro border border-white/10 rounded-xl px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate">{note.content}</p>
                <p className="text-xs text-gray-500">{formatDate(note.created_at)}</p>
              </div>
              <button
                onClick={() => deleteNote(note)}
                aria-label={t("portal.tasks.delete")}
                className="text-gray-500 hover:text-red-400 transition shrink-0"
              >
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Brain;
