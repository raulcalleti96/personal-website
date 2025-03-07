import { motion } from "framer-motion";
import PropTypes from "prop-types";

function ReadmeModal({ content, onClose }) {
  return (
    <div className="fixed inset-0 bg-negro-mate bg-opacity-60 flex items-center justify-center z-50">
      <motion.div
        className="bg-gris-oscuro p-6 rounded-lg shadow-xl max-w-3xl w-full relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-naranja-vibrante hover:text-blanco-suave transition"
        >
          ✕
        </button>
        <div className="prose max-w-full text-blanco-suave">
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>
      </motion.div>
    </div>
  );
}

ReadmeModal.propTypes = {
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReadmeModal;