using System;
using System.Management;
using System.Windows.Forms;
using Quobject.SocketIoClientDotNet.Client;

delegate void StringArgReturningVoidDelegate(string text);

namespace TokenGenerator
{
    public partial class Form1 : Form
    {

        Quobject.SocketIoClientDotNet.Client.Socket socket;

        public Form1() {
            InitializeComponent();
            socket = IO.Socket("http://localhost:3000");
            socket.On(Socket.EVENT_CONNECT, () => {
            });

            socket.On("unique", (data) => {
                this.SetText((String)data);
            });
        }

        private void button1_Click(object sender, EventArgs e) {
            socket.Emit("motherboard", getMotherBoardID());
        }

        public String getMotherBoardID() {
            String serial = "";
            try {
                ManagementObjectSearcher mos = new ManagementObjectSearcher("SELECT SerialNumber FROM Win32_BaseBoard");
                ManagementObjectCollection moc = mos.Get();

                foreach (ManagementObject mo in moc) {
                    serial = mo["SerialNumber"].ToString();
                }
                return serial;
            }
            catch (Exception) { return serial; }
        }
        private void SetText(string text) {
            if (this.textBox1.InvokeRequired) {
                StringArgReturningVoidDelegate d = new StringArgReturningVoidDelegate(SetText);
                this.Invoke(d, new object[] { text });
            }
            else {
                this.textBox1.Text = text; //never get here since SetText is always called from another thread
            }
        }
    }
}
