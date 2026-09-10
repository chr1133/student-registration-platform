import React from "react";
import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", isDangerous = true }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || "Confirm Action"}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn ${isDangerous ? "btn-primary" : "btn-terracotta"}`}
            style={isDangerous ? { background: "var(--status-danger)", borderColor: "var(--status-danger)" } : {}}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {isDangerous && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--status-danger-bg)",
              color: "var(--status-danger)",
              display: "flex",
              alignItems: "center",
              justify-content: "center",
              flexShrink: 0,
            }}
          >
            <AlertTriangle style={{ width: 20, height: 20 }} />
          </div>
        )}
        <div>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{message}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
